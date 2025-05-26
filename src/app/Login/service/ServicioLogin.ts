import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { v4 as uuidv4 } from "uuid";
import { SQL_ACCESO } from "../repository/sql_acceso";
import { SQL_INGRESO } from "../repository/sql_ingreso";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { compare } from "bcryptjs";
import InfoToken from "../model/InfoToken";
import sql_login from "../repository/sql_login";
import rateLimit from "express-rate-limit";

dotenv.config({ path: "variables.env" });

export const loginLimiter = rateLimit({
  windowMs: 1000,
  max:10000,
  message:
    "Demasiados intentos de login desde esta IP, por favor intente más tarde",
});

class ServicioLogin {
  protected static async iniciarSesion(req: Request, res: Response): Promise<any> {
    const { correoAcceso, claveAcceso } = req.body;

    if (!correoAcceso || !claveAcceso) {
      return res.status(400).json({
        respuesta: "Correo y contraseña son requeridos",
        autenticado: false,
      });
    }

    try {
      const resultado = await pool.tx(async t => {
        const datosUsuario = await t.oneOrNone(SQL_ACCESO.FIND_BY_EMAIL, [correoAcceso]);
        if (!datosUsuario) return { error: "Correo no encontrado" };
      
        const isValid = await compare(claveAcceso, datosUsuario.claveacceso);
        if (!isValid) return { error: "Contraseña incorrecta" };
      
        const nuevoUUID = uuidv4();
        await t.one(SQL_ACCESO.UPDATE_UUID, [datosUsuario.codusuario, nuevoUUID]);
      
        const nuevoIngreso = await t.one(SQL_INGRESO.ADD, [datosUsuario.codusuario]);
      
        const infoUsuario = await t.oneOrNone(sql_login.getData, [datosUsuario.codusuario]) as InfoToken;
        if (!infoUsuario) return { error: "No se encontró información del usuario" };
      
        return { infoUsuario, nuevoIngreso };
      });
      

      if ("error" in resultado) {
        return res.status(401).json({
          respuesta: resultado.error,
          autenticado: false,
        });
      }

      const { infoUsuario, nuevoIngreso } = resultado;

      const secret = process.env.JWT_SECRET as string;
      if (!secret) throw new Error("JWT_SECRET no definido en variables de entorno");

      const token = jwt.sign(infoUsuario, secret, { expiresIn: "2h" });

      res.status(200).json({
        respuesta: "Inicio de sesión exitoso",
        autenticado: true,
        token,
        ingreso: {
          codIngreso: nuevoIngreso.codingreso || null,
          fechaIngreso: nuevoIngreso.fechaingreso || null,
          horaIngreso: nuevoIngreso.horaingreso || null,
        },
      });
    } catch (error) {
      console.error("Error en iniciarSesion:", error);
      res.status(500).json({
        respuesta: "Error interno al iniciar sesión",
        autenticado: false,
        error: error,
      });
    }
  }

  protected static async validarSesion(req: Request, res: Response): Promise<any> {
    const { codUsuario, uuidAcceso } = req.body;

    try {
      const resultado = await pool.task(async t => {
        const datosUsuario = await t.oneOrNone(SQL_ACCESO.FIND_BY_ID, [codUsuario]);
        if (!datosUsuario || datosUsuario.uuidacceso !== uuidAcceso) {
          return { error: "Sesión inválida o expirada" };
        }

        const infoUsuario = await t.oneOrNone(sql_login.dataUser, [codUsuario]);
        const ultimoIngreso = await t.oneOrNone(SQL_INGRESO.LAST_ENTRY, [codUsuario]);

        return { infoUsuario, ultimoIngreso };
      });

      if ("error" in resultado) {
        return res.status(401).json({
          respuesta: resultado.error,
          sesionValida: false,
        });
      }

      const { infoUsuario, ultimoIngreso } = resultado;

      res.status(200).json({
        respuesta: "Sesión válida",
        sesionValida: true,
        usuario: {
          codUsuario: infoUsuario.codusuario,
          nombreRol: infoUsuario.nombrerol,
          nombresUsuario: infoUsuario.nombresusuario,
          apellidosUsuario: infoUsuario.apellidosusuario,
        },
        ingreso: ultimoIngreso
          ? {
              codIngreso: ultimoIngreso.codingreso,
              fechaIngreso: ultimoIngreso.fechaingreso,
              horaIngreso: ultimoIngreso.horaingreso,
            }
          : null,
      });
    } catch (error) {
      console.error("Error en validarSesion:", error);
      res.status(500).json({
        respuesta: "Error interno al validar sesión",
        sesionValida: false,
      });
    }
  }

  protected static async cerrarSesion(req: Request, res: Response): Promise<any> {
    const { codUsuario } = req.body;

    try {
      const resultado = await pool.task(async t => {
        const nuevoUUID = uuidv4();
        return await t.result(SQL_ACCESO.UPDATE_UUID, [codUsuario, nuevoUUID]);
      });

      if (resultado && resultado.rowCount > 0) {
        return res.status(200).json({
          respuesta: "Sesión cerrada exitosamente",
        });
      } else {
        return res.status(404).json({
          respuesta: "No se encontró el usuario para cerrar sesión",
        });
      }
    } catch (error) {
      console.error("Error en cerrarSesion:", error);
      res.status(500).json({
        respuesta: "Error interno al cerrar sesión",
      });
    }
  }

  protected static async obtenerHistorialIngresos(req: Request, res: Response): Promise<any> {
    const { codUsuario } = req.params;

    try {
      const resultado = await pool.task(async t => {
        return await t.result(SQL_INGRESO.FIND_BY_USER, [codUsuario]);
      });

      if (resultado.rows.length === 0) {
        return res.status(404).json({
          respuesta: "No se encontraron registros de ingreso para el usuario",
        });
      }

      res.status(200).json({
        respuesta: "Consulta de historial de ingresos exitosa",
        cantidad: resultado.rows.length,
        ingresos: resultado.rows,
      });
    } catch (error) {
      console.error("Error en obtenerHistorialIngresos:", error);
      res.status(500).json({
        respuesta: "Error interno al consultar historial de ingresos",
      });
    }
  }
}

export default ServicioLogin;

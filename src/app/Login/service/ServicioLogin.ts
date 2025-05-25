import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { v4 as uuidv4 } from "uuid";
import { SQL_ACCESO } from "../repository/sql_acceso";
import { SQL_INGRESO } from "../repository/sql_ingreso";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { compare } from "bcryptjs"; // versión asíncrona
import InfoToken from "../model/InfoToken";
import sql_login from "../repository/sql_login";
import rateLimit from "express-rate-limit";

dotenv.config({ path: "variables.env" });

// Configuración de rate limiting
export const loginLimiter = rateLimit({
  windowMs: 1000,
  max: 100000,
  message:
    "Demasiados intentos de login desde esta IP, por favor intente más tarde",
});

class ServicioLogin {
  protected static async iniciarSesion(
    req: Request,
    res: Response
  ): Promise<any> {
    const { correoAcceso, claveAcceso } = req.body;

    if (!correoAcceso || !claveAcceso) {
      return res.status(400).json({
        respuesta: "Correo y contraseña son requeridos",
        autenticado: false,
      });
    }

    try {
      const datosUsuario = await pool.oneOrNone(SQL_ACCESO.FIND_BY_EMAIL, [
        correoAcceso,
      ]);

      if (!datosUsuario) {
        return res.status(401).json({
          respuesta: "Correo no encontrado",
          autenticado: false,
        });
      }

      const isValid = await compare(claveAcceso, datosUsuario.claveacceso);
      console.log("isValid", isValid);
      console.log("Contraseña ingresada:", claveAcceso);
      console.log("Contraseña en base de datos:", datosUsuario.claveacceso);
      if (!isValid) {
        return res.status(401).json({
          respuesta: "Contraseña incorrecta",
          autenticado: false,
        });
      }

      const nuevoUUID = uuidv4();

      await pool.one(SQL_ACCESO.UPDATE_UUID, [
        datosUsuario.codusuario,
        nuevoUUID,
      ]);

      const nuevoIngreso = await pool.one(SQL_INGRESO.ADD, [
        datosUsuario.codusuario,
      ]);

      const infoUsuario = (await pool.oneOrNone(sql_login.getData, [
        datosUsuario.codusuario,
      ])) as InfoToken;

      if (!infoUsuario) {
        return res.status(404).json({
          respuesta: "No se encontró información del usuario",
          autenticado: false,
        });
      }

      const secret = process.env.JWT_SECRET as string;
      if (!secret)
        throw new Error("JWT_SECRET no definido en variables de entorno");

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
      console.log("Error en iniciarSesion:", error);
      res.status(500).json({
        respuesta: "Error interno al iniciar sesión",
        autenticado: false,
      });
    }
  }

  protected static async validarSesion(
    req: Request,
    res: Response
  ): Promise<any> {
    const { codUsuario, uuidAcceso } = req.body;

    try {
      const datosUsuario = await pool.oneOrNone(SQL_ACCESO.FIND_BY_ID, [
        codUsuario,
      ]);

      if (!datosUsuario || datosUsuario.uuidacceso !== uuidAcceso) {
        return res.status(401).json({
          respuesta: "Sesión inválida o expirada",
          sesionValida: false,
        });
      }

      const infoUsuario = await pool.oneOrNone(sql_login.dataUser, [
        codUsuario,
      ]);
      const ultimoIngreso = await pool.oneOrNone(SQL_INGRESO.LAST_ENTRY, [
        codUsuario,
      ]);

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
      console.log("Error en validarSesion:", error);
      res.status(500).json({
        respuesta: "Error interno al validar sesión",
        sesionValida: false,
      });
    }
  }

  protected static async cerrarSesion(
    req: Request,
    res: Response
  ): Promise<any> {
    const { codUsuario } = req.body;

    try {
      const nuevoUUID = uuidv4();
      const result = await pool.result(SQL_ACCESO.UPDATE_UUID, [
        codUsuario,
        nuevoUUID,
      ]);

      if (result && result.rowCount > 0) {
        return res.status(200).json({
          respuesta: "Sesión cerrada exitosamente",
        });
      } else {
        return res.status(404).json({
          respuesta: "No se encontró el usuario para cerrar sesión",
        });
      }
    } catch (error) {
      console.log("Error en cerrarSesion:", error);
      res.status(500).json({
        respuesta: "Error interno al cerrar sesión",
      });
    }
  }

  protected static async obtenerHistorialIngresos(
    req: Request,
    res: Response
  ): Promise<any> {
    const { codUsuario } = req.params;

    try {
      const historialIngresos = await pool.result(SQL_INGRESO.FIND_BY_USER, [
        codUsuario,
      ]);

      if (historialIngresos.rows.length === 0) {
        return res.status(404).json({
          respuesta: "No se encontraron registros de ingreso para el usuario",
        });
      }

      res.status(200).json({
        respuesta: "Consulta de historial de ingresos exitosa",
        cantidad: historialIngresos.rows.length,
        ingresos: historialIngresos.rows,
      });
    } catch (error) {
      console.log("Error en obtenerHistorialIngresos:", error);
      res.status(500).json({
        respuesta: "Error interno al consultar historial de ingresos",
      });
    }
  }
}

export default ServicioLogin;

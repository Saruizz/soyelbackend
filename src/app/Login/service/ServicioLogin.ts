import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";

import Acceso from "../model/Acceso";
import { v4 as uuidv4 } from "uuid";
import { SQL_ACCESO } from "../repository/sql_acceso";
import { SQL_INGRESO } from "../repository/sql_ingreso";
import Ingreso from "../model/Ingreso";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: "variables.env" });


import cifrar from "bcryptjs";
import InfoToken from "../model/InfoToken";
import sql_login from "../repository/sql_login";

class ServicioLogin {
    protected static async iniciarSesion(
        req: Request,
        res: Response
    ): Promise<any> {
        const { correoAcceso, claveAcceso } = req.body;
        const claveCifrada = cifrar.hashSync(claveAcceso as string);
        try {
            // Verificar si el usuario existe con las credenciales proporcionadas
            const datosUsuario = await pool.oneOrNone(
                SQL_ACCESO.FIND_BY_EMAIL,
                [correoAcceso]
            );

            console.log(datosUsuario);

            const isValid = cifrar.compareSync(claveAcceso, datosUsuario.claveacceso);

            if (!datosUsuario || !isValid) {
                return res.status(401).json({
                    respuesta: "Credenciales incorrectas",
                    autenticado: false,
                });
            }

            // Crear un nuevo UUID para la sesión
            const nuevoUUID = uuidv4();

            // Actualizar el UUID en la base de datos
            const usuarioActualizado = await pool.one(SQL_ACCESO.UPDATE_UUID, [
                datosUsuario.codusuario,
                nuevoUUID,
            ]);

            // Registrar el ingreso al sistema
            const nuevoIngreso = await pool.one(SQL_INGRESO.ADD, [
                datosUsuario.codusuario,
            ]);

            // Obtener información del usuario
            const infoUsuario = await pool.oneOrNone(
                sql_login.getData,
                [datosUsuario.codusuario]
            ) as InfoToken;

            const secret = process.env.JWT_SECRET as string;

            const token = jwt.sign(infoUsuario, secret, { expiresIn: "2h" });

            if (!infoUsuario) {
                return res.status(404).json({
                    respuesta: "No se encontró información del usuario",
                    autenticado: false,
                });
            }

            // Respuesta exitosa con información de usuario
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
            console.log(error);
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

            // Obtener información del usuario
            const infoUsuario = await pool.oneOrNone(
                sql_login.dataUser,
                [codUsuario]
            );

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
            console.log(error);
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
            // Invalidar el UUID actual generando uno nuevo aleatorio
            const nuevoUUID = uuidv4();

            const result = await pool.result(SQL_ACCESO.UPDATE_UUID, [
                codUsuario,
                nuevoUUID,
            ]);

            // Verificar si se actualizó correctamente
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
            console.log(error);
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
            console.log(error);
            res.status(500).json({
                respuesta: "Error interno al consultar historial de ingresos",
            });
        }
    }
}

export default ServicioLogin;

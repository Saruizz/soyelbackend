import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";

import Acceso from "../model/Acceso";
import { v4 as uuidv4 } from "uuid";
import { SQL_ACCESO } from "../repository/sql_acceso";
import { SQL_INGRESO } from "../repository/sql_ingreso";
import Ingreso from "../model/Ingreso";

class ServicioLogin {
    protected static async iniciarSesion(
        req: Request,
        res: Response
    ): Promise<any> {
        const { correoAcceso, claveAcceso } = req.body;

        try {
            // Verificar si el usuario existe con las credenciales proporcionadas
            const datosUsuario = await pool.oneOrNone(
                SQL_ACCESO.FIND_BY_CREDENTIALS,
                [correoAcceso, claveAcceso]
            );

            if (!datosUsuario) {
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
                "SELECT u.cod_usuario as codUsuario, u.nombres_usuario as nombresUsuario, " +
                "u.apellidos_usuario as apellidosUsuario, r.nombre_rol as nombreRol " +
                "FROM usuarios u " +
                "JOIN roles r ON u.cod_rol = r.cod_rol " +
                "WHERE u.cod_usuario = $1",
                [datosUsuario.codusuario]
            );

            if (!infoUsuario) {
                return res.status(404).json({
                    respuesta: "No se encontró información del usuario",
                    autenticado: false,
                });
            }

            const acceso = new Acceso(
                usuarioActualizado.codusuario,
                usuarioActualizado.correoacceso,
                usuarioActualizado.claveacceso,
                usuarioActualizado.uuidacceso
            );

            const ingreso = new Ingreso(
                nuevoIngreso.codingreso,
                nuevoIngreso.codusuario,
                nuevoIngreso.fechaingreso,
                nuevoIngreso.horaingreso
            );

            // Respuesta exitosa con información de usuario
            res.status(200).json({
                respuesta: "Inicio de sesión exitoso",
                autenticado: true,
                usuario: {
                    codUsuario: infoUsuario.codusuario,
                    nombreRol: infoUsuario.nombrerol,
                    nombresUsuario: infoUsuario.nombresusuario,
                    apellidosUsuario: infoUsuario.apellidosusuario,
                    uuidAcceso: acceso.uuidAcceso,
                },
                ingreso: {
                    codIngreso: ingreso.codIngreso,
                    fechaIngreso: ingreso.fechaIngreso,
                    horaIngreso: ingreso.horaIngreso,
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
                "SELECT u.cod_usuario as codUsuario, u.nombres_usuario as nombresUsuario, " +
                "u.apellidos_usuario as apellidosUsuario, r.nombre_rol as nombreRol " +
                "FROM usuarios u " +
                "JOIN roles r ON u.cod_rol = r.cod_rol " +
                "WHERE u.cod_usuario = $1",
                [codUsuario]
            );

            const ultimoIngreso = await pool.oneOrNone(
                `SELECT 
                    i.cod_ingreso as codIngreso,
                    TO_CHAR(i.fecha_ingreso, 'DD/MM/YYYY') as fechaIngreso,
                    TO_CHAR(i.hora_ingreso, 'HH12:MI:SS AM') as horaIngreso
                FROM ingresos i
                WHERE i.cod_usuario = $1
                ORDER BY i.fecha_ingreso DESC, i.hora_ingreso DESC
                LIMIT 1`,
                [codUsuario]
            );

            res.status(200).json({
                respuesta: "Sesión válida",
                sesionValida: true,
                usuario: {
                    codUsuario: infoUsuario.codusuario,
                    nombreRol: infoUsuario.nombrerol,
                    nombresUsuario: infoUsuario.nombresusuario,
                    apellidosUsuario: infoUsuario.apellidosusuario,
                },
                ingreso: ultimoIngreso ? {
                    codIngreso: ultimoIngreso.codingreso,
                    fechaIngreso: ultimoIngreso.fechaingreso,
                    horaIngreso: ultimoIngreso.horaingreso
                } : null

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
            const historialIngresos = await pool.result(
                SQL_INGRESO.FIND_BY_USER,
                [codUsuario]
            );

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

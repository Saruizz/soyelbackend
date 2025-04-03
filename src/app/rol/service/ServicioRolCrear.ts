import { Response } from "express";
import Rol from "../model/Rol";
import { SQL_ROL } from "../repository/sql_rol";
import pool from "../../../config/connection/dbConnection";

class ServicioRolCrear {
    protected static async grabarRol(obj: Rol, res: Response): Promise<any> {
        try {
            if (!obj || !obj.nombreRol) {
                return res.status(400).json({
                    respuesta: "Datos de rol inválidos"
                });
            }

            const verificacionRol = await pool.one(SQL_ROL.HOW_MANY, [obj.nombreRol]);

            if (verificacionRol.cantidad > 0) {
                return res.status(409).json({
                    respuesta: "Ya existe un rol con este nombre"
                });
            }

            const rolCreado = await pool.one(SQL_ROL.ADD, [obj.nombreRol]);

            res.status(201).json({
                respuesta: "Rol creado exitosamente",
                detalles: {
                    codigoRol: rolCreado.cod_rol,
                    nombreRol: obj.nombreRol
                }
            });

        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al crear rol"
            });
        }
    }
}

export default ServicioRolCrear;
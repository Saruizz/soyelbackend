import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import Rol from "../model/Rol";
import { SQL_ROL } from "../repository/sql_rol";

class ServicioRolActualizar {
    protected static async actualizarRol(
        objRol: Rol,
        res: Response
    ): Promise<any> {
        try {
            if (!objRol || !objRol.codRol || !objRol.nombreRol) {
                return res.status(400).json({
                    respuesta: "Datos de rol inválidos"
                });
            }

            const rolExistente = await pool.oneOrNone(
                SQL_ROL.FIND_BY_ID,
                [objRol.codRol]
            );

            if (!rolExistente) {
                return res.status(404).json({
                    respuesta: "El rol no existe"
                });
            }

            const rolesConMismoNombre = await pool.one(
                SQL_ROL.HOW_MANY,
                [objRol.nombreRol]
            );

            if (rolesConMismoNombre.cantidad > 0) {
                return res.status(409).json({
                    respuesta: "Ya existe un rol con este nombre"
                });
            }

            const resultado = await pool.result(SQL_ROL.UPDATE, [
                objRol.nombreRol,
                objRol.codRol
            ]);

            if (resultado.rowCount === 0) {
                return res.status(500).json({
                    respuesta: "No se pudo actualizar el rol"
                });
            }

            res.status(200).json({
                respuesta: "Rol actualizado correctamente",
                detalles: {
                    filasActualizadas: resultado.rowCount,
                    codigoRol: objRol.codRol,
                    nuevoNombre: objRol.nombreRol
                }
            });

        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al actualizar el rol"
            });
        }
    }
}

export default ServicioRolActualizar;

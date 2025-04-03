import pool from "../../../config/connection/dbConnection";
import Rol from "../model/Rol";
import { Response } from "express";
import { SQL_ROL } from "../repository/sql_rol";

class ServicioRolBorrar {
    protected static async borrar(obj: Rol, res: Response): Promise<any> {
        try {

            const existeRegistro = await pool.oneOrNone(
                SQL_ROL.FIND_BY_ID,
                [obj.codRol]
            );

            if (!existeRegistro) {
                return res.status(404).json({
                    respuesta: "El rol no existe"
                });
            }

            const respuesta = await pool.result(
                SQL_ROL.DELETE,
                [obj.codRol]
            );

            if (respuesta.rowCount === 0) {
                return res.status(400).json({
                    respuesta: "No se pudo eliminar el registro de rol"
                });
            }

            res.status(200).json({
                respuesta: "Rol eliminado correctamente",
                "Filas borradas": respuesta.rowCount,
            });

        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al intentar eliminar el rol"
            });
        }
    }
}

export default ServicioRolBorrar;

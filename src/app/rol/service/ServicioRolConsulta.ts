import { Response } from "express"
import pool from "../../../config/connection/dbConnection";
import { SQL_ROL } from "../repository/sql_rol";

class ServicioRolConsulta {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const misDatos = await pool.result(SQL_ROL.FIND_ALL);

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron roles registrados"
                });
            }

            res.status(200).json({
                respuesta: "Consulta de roles exitosa",
                cantidad: misDatos.rows.length,
                roles: misDatos.rows
            });

        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar roles"
            });
        }
    }
}

export default ServicioRolConsulta;
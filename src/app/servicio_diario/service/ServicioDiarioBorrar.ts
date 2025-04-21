import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_SERVICIO_DIARIO } from "../repository/sql_servicio_diario";

class ServicioDiarioBorrar {
    protected static async borrarServicioDiario(req: Request, res: Response): Promise<any> {
        const { codServicioDiario} = req.params;

        try {
            const existeServicio = await pool.oneOrNone(
                SQL_SERVICIO_DIARIO.HOW_MANY,
                [codServicioDiario]
            );

            if (existeServicio.cantidad === "0") {
                return res.status(404).json({
                    respuesta: "El servicio diario que intenta eliminar no existe",
                });
            }

            await pool.result(
                SQL_SERVICIO_DIARIO.DELETE,
                [codServicioDiario]
            );

            res.status(200).json({
                respuesta: "Servicio diario eliminado correctamente",
                servicioEliminado: {
                     codServicioDiario,
                }
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al eliminar el servicio diario"
            });
        }
    }
}

export default ServicioDiarioBorrar;
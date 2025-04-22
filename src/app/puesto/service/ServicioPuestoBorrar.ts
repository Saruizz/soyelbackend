import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_PUESTO } from "../repository/sql_puesto";

class ServicioPuestoBorrar{
    protected static async borrarPuesto(req: Request, res: Response): Promise<any> {
        const {codPuesto} = req.params;

        try {
            const existePuesto = await pool.oneOrNone(
                SQL_PUESTO.HOW_MANY,
                [codPuesto]
            );

            if (existePuesto.cantidad === "0") {
                return res.status(404).json({
                    respuesta: "El puesto que intenta eliminar no existe",
                });
            }

            await pool.result(
                SQL_PUESTO.DELETE,
                [codPuesto]
            );

            res.status(200).json({
                respuesta: "Puesto eliminado correctamente",
                puestoEliminado: {
                    codPuesto
                }
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al eliminar el puesto"
            });
        }
}

}
export default ServicioPuestoBorrar;
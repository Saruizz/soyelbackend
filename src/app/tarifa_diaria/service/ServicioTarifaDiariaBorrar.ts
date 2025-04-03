import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";

class ServicioTarifaDiariaBorrar {
    protected static async borrarTarifaDiaria(req: Request, res: Response): Promise<any> {
        const { codParqueadero, codTipoVehiculo } = req.params;

        try {
            const existeTarifa = await pool.oneOrNone(
                SQL_TARIFA_DIARIA.HOW_MANY,
                [codParqueadero, codTipoVehiculo]
            );

            if (existeTarifa.cantidad === "0") {
                return res.status(404).json({
                    respuesta: "La tarifa diaria que intenta eliminar no existe",
                });
            }

            await pool.result(
                SQL_TARIFA_DIARIA.DELETE,
                [codParqueadero, codTipoVehiculo]
            );

            res.status(200).json({
                respuesta: "Tarifa diaria eliminada correctamente",
                tarifaEliminada: {
                    codParqueadero,
                    codTipoVehiculo
                }
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al eliminar la tarifa diaria"
            });
        }
    }
}

export default ServicioTarifaDiariaBorrar;
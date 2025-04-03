import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";
import TarifaDiaria from "../model/TarifaDiaria";

class ServicioTarifaDiariaActualizar {
    protected static async actualizarTarifaDiaria(req: Request, res: Response): Promise<any> {
        const { codParqueadero, codTipoVehiculo, valorTarifaDiaria } = req.body;

        try {
            const existeTarifa = await pool.oneOrNone(
                SQL_TARIFA_DIARIA.HOW_MANY,
                [codParqueadero, codTipoVehiculo]
            );

            if (existeTarifa.cantidad === "0") {
                return res.status(404).json({
                    respuesta: "La tarifa diaria que intenta actualizar no existe",
                });
            }

            const tarifaActualizada = await pool.one(
                SQL_TARIFA_DIARIA.UPDATE,
                [codParqueadero, codTipoVehiculo, valorTarifaDiaria]
            );

            const tarifaDiaria = new TarifaDiaria(
                tarifaActualizada.codparqueadero,
                tarifaActualizada.codtipovehiculo,
                tarifaActualizada.valortarifadiaria
            );

            res.status(200).json({
                respuesta: "Tarifa diaria actualizada correctamente",
                tarifaActualizada: tarifaActualizada
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al actualizar la tarifa diaria"
            });
        }
    }
}

export default ServicioTarifaDiariaActualizar;
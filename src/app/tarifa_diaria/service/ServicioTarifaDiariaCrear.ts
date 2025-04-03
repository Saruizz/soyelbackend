import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";
import TarifaDiaria from "../model/TarifaDiaria";

class ServicioTarifaDiariaCrear {
    protected static async grabarTarifaDiaria(req: Request, res: Response): Promise<any> {
        const { codParqueadero, codTipoVehiculo, valorTarifaDiaria } = req.body;

        try {
            const existeTarifa = await pool.oneOrNone(
                SQL_TARIFA_DIARIA.HOW_MANY,
                [codParqueadero, codTipoVehiculo]
            );

            if (existeTarifa.cantidad !== "0") {
                return res.status(400).json({
                    respuesta: "Ya existe una tarifa diaria para este parqueadero y tipo de vehículo",
                });
            }

            const nuevaTarifa = await pool.one(
                SQL_TARIFA_DIARIA.ADD,
                [codParqueadero, codTipoVehiculo, valorTarifaDiaria]
            );

            const tarifaDiaria = new TarifaDiaria(
                nuevaTarifa.codparqueadero,
                nuevaTarifa.codtipovehiculo,
                nuevaTarifa.valortarifadiaria
            );

            res.status(201).json({
                respuesta: "Tarifa diaria creada correctamente",
                nuevaTarifa: nuevaTarifa
            });
        } catch (error: any) {
            console.log(error);

            if (error.code === '23503') { // Código de PostgreSQL para violación de clave foránea
                return res.status(400).json({
                    respuesta: "Error al crear la tarifa. Verifique que el parqueadero y el tipo de vehículo existan.",
                    detalleError: error.detail
                });
            }

            return res.status(500).json({
                respuesta: "Error interno al crear la tarifa diaria",
                error: error.message
            });
        }
    }
}

export default ServicioTarifaDiariaCrear;
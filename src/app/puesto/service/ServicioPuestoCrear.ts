import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_PUESTO } from "../repository/sql_puesto";
import Puesto from "../model/Puesto";

class ServicioPuestoCrear {
    protected static async grabarPuesto(req: Request, res: Response): Promise<any> {
        const { codPuesto, codParqueadero, codTipoVehiculo, detallePuesto} = req.body;

        // Validar que el puesto no exista
        const existePuesto = await pool.oneOrNone(
            SQL_PUESTO.HOW_MANY,
            [codPuesto, codParqueadero, codTipoVehiculo]
        );

        if (existePuesto.cantidad !== "0") {
            return res.status(400).json({
                respuesta: "Ya existe un puesto con ese código para este parqueadero y tipo de vehículo",
            });
        }

        try {
            const nuevoPuesto = await pool.one(
                SQL_PUESTO.ADD,
                [codPuesto, codParqueadero, codTipoVehiculo, detallePuesto]
            );

            const puesto = new Puesto(
                nuevoPuesto.codpuesto,
                nuevoPuesto.codparqueadero,
                nuevoPuesto.codtipovehiculo,
                nuevoPuesto.detallepuesto
            );

            res.status(201).json({
                respuesta: "Puesto creado correctamente",
                nuevoPuesto: nuevoPuesto
            });
        } catch (error: any) {
            console.log(error);

            if (error.code === '23503') { // Código de PostgreSQL para violación de clave foránea
                return res.status(400).json({
                    respuesta: "Error al crear el puesto. Verifique que el parqueadero y el tipo de vehículo existan.",
                    detalleError: error.detail
                });
            }

            return res.status(500).json({
                respuesta: "Error interno al crear el puesto",
                error: error.message
            });
        }
    }
}
export default ServicioPuestoCrear;
import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_SERVICIO_DIARIO } from "../repository/sql_servicio_diario";
import ServicioDiario from "../model/ServicioDiario";

class ServicioDiarioCrear{
    protected static async grabarServicioDiario(req: Request, res: Response): Promise<any> {
        const { codServicioDiario, codParqueadero, codVehiculo, codPuesto, fechaInicioServicioDiario, fechaFinServicioDiario, valorServicioDiario } = req.body;

        try {
                const existeServicioDiario = await pool.oneOrNone(
                    SQL_SERVICIO_DIARIO.HOW_MANY,
                    [ codServicioDiario]
                );

                if (existeServicioDiario.cantidad !== "0") {
                    return res.status(400).json({
                        respuesta: "Ya existe un servicio diario para este vehículo",
                    });
                }


            const nuevoServicio = await pool.one(
                SQL_SERVICIO_DIARIO.ADD,
                [ codServicioDiario, codParqueadero, codVehiculo, codPuesto, fechaInicioServicioDiario, fechaFinServicioDiario, valorServicioDiario]
            );

            const servicioDiario = new ServicioDiario(
                nuevoServicio.codserviciodiario,
                nuevoServicio.codparqueadero,
                nuevoServicio.codvehiculo,
                nuevoServicio.codpuesto,
                nuevoServicio.fechainicioserviciodiario,
                nuevoServicio.fechafinserviciodiario,
                nuevoServicio.valorserviciodiario
            );

            res.status(201).json({
                respuesta: "Servicio diario creado correctamente",
                nuevoServicio: servicioDiario
            });
        } catch (error: any) {
            console.log(error);
            
            if (error.code === '23503') { // Código de PostgreSQL para violación de clave foránea
                return res.status(400).json({
                    respuesta: "Error al crear el servicio diario. Verifique que el parqueadero y el vehículo existan.",
                    detalleError: error.detail
                });
            }

            return res.status(500).json({
                respuesta: "Error interno al crear el servicio diario",
                error: error.message
            });
        }



    }



}
export default ServicioDiarioCrear;

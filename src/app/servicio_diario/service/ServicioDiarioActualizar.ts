import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_SERVICIO_DIARIO } from "../repository/sql_servicio_diario";
import ServicioDiario from "../model/ServicioDiario";

class ServicioDiarioActualizar {
    protected static async actualizarServicioDiario(req: Request, res: Response): Promise<any> {
        const {
            codServicioDiario,
            codParqueadero,
            codVehiculo,
            codPuesto,
            fechaInicioServicioDiario,
            fechaFinServicioDiario,
            valorServicioDiario
        } = req.body;

        try {
            // Verificar si el servicio diario existe
            const existeServicioDiario = await pool.oneOrNone(
                SQL_SERVICIO_DIARIO.HOW_MANY,
                [codServicioDiario]
            );

            if (existeServicioDiario.cantidad === "0") {
                return res.status(404).json({
                    respuesta: "El servicio diario que intenta actualizar no existe",
                });
            }

            // Actualizar el servicio diario
            const servicioActualizado = await pool.one(
                SQL_SERVICIO_DIARIO.UPDATE,
                [
                    codServicioDiario,
                    codParqueadero,
                    codVehiculo,
                    codPuesto,
                    fechaInicioServicioDiario,
                    fechaFinServicioDiario,
                    valorServicioDiario
                ]
            );

            // Crear una instancia del modelo con los datos actualizados
            const servicioDiario = new ServicioDiario(
                servicioActualizado.codserviciodiario,
                servicioActualizado.codparqueadero,
                servicioActualizado.codvehiculo,
                servicioActualizado.codpuesto,
                servicioActualizado.fechainicioserviciodiario,
                servicioActualizado.fechafinserviciodiario,
                servicioActualizado.valorserviciodiario
            );

            res.status(200).json({
                respuesta: "Servicio diario actualizado correctamente",
                servicioActualizado: servicioDiario
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al actualizar el servicio diario"
            });
        }
    }
}

export default ServicioDiarioActualizar;
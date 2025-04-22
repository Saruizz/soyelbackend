import { Response } from "express";
import { SQL_VEHICULO } from "../repository/sql_vehiculo";
import pool from "../../../config/connection/dbConnection";
import Vehiculo from "../model/Vehiculo";

class ServicioVehiculoCrear {
    protected static async grabarVehiculo(
        obj: Vehiculo,
        res: Response
    ): Promise<any> {
        try {
            if (
                !obj ||
                !obj.codTipoVehiculo ||
                !obj.codUsuario ||
                !obj.placaVehiculo
            ) {
                return res.status(400).json({
                    respuesta: "Datos de vehículo inválidos",
                });
            }

            // Verificar que la placa no exista
            const vehiculoExistente = await pool.oneOrNone(
                SQL_VEHICULO.FIND_BY_PLACA,
                [obj.placaVehiculo]
            );

            if (vehiculoExistente) {
                return res.status(409).json({
                    respuesta: "Ya existe un vehículo con esta placa",
                });
            }

            // Crear el vehículo
            const objGrabado = await pool.one(SQL_VEHICULO.ADD, [
                obj.codTipoVehiculo,
                obj.codUsuario,
                obj.placaVehiculo,
            ]);

            res.status(201).json({
                respuesta: "Vehículo creado con éxito",
                vehiculo: objGrabado
            });

        } catch (error: any) {
            console.log(error);
            res.status(500).json({
                respuesta: "Error interno al crear el vehículo",
                error: error.message
            });
        }
    }
}

export default ServicioVehiculoCrear;
import { Response } from "express";
import Vehiculo from "../model/Vehiculo";
import pool from "../../../config/connection/dbConnection";
import { SQL_VEHICULO } from "../repository/sql_vehiculo";

class ServicioVehiculoActualizar {
    protected static async actualizarVehiculo(
        objVehiculo: Vehiculo,
        res: Response
    ): Promise<any> {
        try {
            if (
                !objVehiculo ||
                !objVehiculo.codVehiculo ||
                !objVehiculo.codTipoVehiculo ||
                !objVehiculo.codUsuario ||
                !objVehiculo.placaVehiculo
            ) {
                return res.status(400).json({
                    respuesta: "Datos de vehículo inválidos",
                });
            }

            // Verificar que el vehículo existe
            const vehiculoExistente = await pool.oneOrNone(
                SQL_VEHICULO.FIND_BY_PRIMARY_KEY,
                [objVehiculo.codVehiculo]
            );

            if (!vehiculoExistente) {
                return res.status(404).json({
                    respuesta: "El vehículo no existe",
                });
            }

            // Verificar si la nueva placa existe en otro vehículo (excepto en el actual)
            if (vehiculoExistente.placavehiculo !== objVehiculo.placaVehiculo) {
                const placaExistente = await pool.oneOrNone(
                    SQL_VEHICULO.FIND_BY_PLACA,
                    [objVehiculo.placaVehiculo]
                );

                if (placaExistente && placaExistente.codvehiculo !== objVehiculo.codVehiculo) {
                    return res.status(409).json({
                        respuesta: "Ya existe un vehículo con esta placa",
                    });
                }
            }

            const resultado = await pool.oneOrNone(SQL_VEHICULO.UPDATE, [
                objVehiculo.codVehiculo,
                objVehiculo.codTipoVehiculo,
                objVehiculo.codUsuario,
                objVehiculo.placaVehiculo,
            ]);

            if (!resultado) {
                return res.status(500).json({
                    respuesta: "No se pudo actualizar el vehículo",
                });
            }

            res.status(200).json({
                respuesta: "Vehículo actualizado correctamente",
                vehiculo: resultado
            });
        } catch (miError: any) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al actualizar el vehículo",
                error: miError.message
            });
        }
    }
}

export default ServicioVehiculoActualizar;
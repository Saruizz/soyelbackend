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
                !objVehiculo.placaVehiculo ||
                !objVehiculo.codTipoVehiculo ||
                !objVehiculo.codUsuario
            ) {
                return res.status(400).json({
                    respuesta: "Datos de vehículo inválidos",
                });
            }

            const vehiculoExistente = await pool.oneOrNone(
                SQL_VEHICULO.FIND_BY_PLACA,
                [objVehiculo.placaVehiculo]
            );

            if (!vehiculoExistente) {
                return res.status(404).json({
                    respuesta: "El vehículo no existe",
                });
            }

            const vehiculos = await pool.one(SQL_VEHICULO.HOW_MANY, [
                objVehiculo.placaVehiculo,
            ]);

            if (vehiculos.cantidad > 0) {
                return res.status(409).json({
                    respuesta: "Ya existe un vehículo con esta placa",
                });
            }

            const resultado = await pool.result(SQL_VEHICULO.UPDATE, [
                objVehiculo.codVehiculo,
                objVehiculo.codTipoVehiculo,
                objVehiculo.codUsuario,
                objVehiculo.placaVehiculo,
            ]);

            if (resultado.rowCount === 0) {
                return res.status(500).json({
                    respuesta: "No se pudo actualizar el vehículo",
                });
            }

            res.status(200).json({
                respuesta: "Vehículo actualizado correctamente",
                detalles: {
                    filasActualizadas: resultado.rowCount,
                    placaVehiculo: objVehiculo.placaVehiculo,
                    nuevoCodTipoVehiculo: objVehiculo.codTipoVehiculo,
                    nuevoCodUsuario: objVehiculo.codUsuario,
                },
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al actualizar el vehículo",
            });
        }
    }
}

export default ServicioVehiculoActualizar;
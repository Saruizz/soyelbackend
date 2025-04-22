import { Request, Response } from "express";
import { SQL_VEHICULO } from "../repository/sql_vehiculo";
import pool from "../../../config/connection/dbConnection";
import Vehiculo from "../model/Vehiculo";

class ServicioVehiculoBorrar {
    protected static async borrarVehiculo(
        obj: Vehiculo,
        res: Response
    ): Promise<any> {
        try {
            const vehiculoExistente = await pool.oneOrNone(
                SQL_VEHICULO.FIND_BY_PRIMARY_KEY,
                [obj.codVehiculo]
            );

            if (!vehiculoExistente) {
                return res.status(404).json({
                    respuesta: "El vehículo no existe",
                });
            }

            const resultado = await pool.result(SQL_VEHICULO.DELETE, [
                obj.codVehiculo,
            ]);

            if (resultado.rowCount === 0) {
                return res.status(500).json({
                    respuesta: "No se pudo eliminar el vehículo",
                });
            }

            res.status(200).json({
                respuesta: "Vehículo eliminado correctamente",
                detalles: {
                    filasEliminadas: resultado.rowCount,
                    vehiculoEliminado: {
                        codVehiculo: obj.codVehiculo,
                        placaVehiculo: vehiculoExistente.placavehiculo,
                    },
                },
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al eliminar el vehículo"
            });
        }
    }
}

export default ServicioVehiculoBorrar;
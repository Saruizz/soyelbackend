import { Response } from "express";
import TipoVehiculo from "../model/TipoVehiculo";
import pool from "../../../config/connection/dbConnection";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipo_vehiculo";

class ServicioTipoVehiculoActualizar {
    protected static async actualizarTipoVehiculo(
        objTipoVehiculo: TipoVehiculo,
        res: Response
    ): Promise<any> {
        try {
            if (
                !objTipoVehiculo ||
                !objTipoVehiculo.codTipoVehiculo ||
                !objTipoVehiculo.claseTipoVehiculo
            ) {
                return res.status(400).json({
                    respuesta: "Datos de tipo de vehículo inválidos",
                });
            }

            const tipoVehiculoExistente = await pool.oneOrNone(
                SQL_TIPO_VEHICULO.FIND_BY_ID,
                [objTipoVehiculo.codTipoVehiculo]
            );

            if (!tipoVehiculoExistente) {
                return res.status(404).json({
                    respuesta: "El tipo de vehículo no existe",
                });
            }

            const tiposVehiculos = await pool.one(SQL_TIPO_VEHICULO.HOW_MANY, [
                objTipoVehiculo.claseTipoVehiculo,
            ]);

            if (tiposVehiculos.cantidad > 0) {
                return res.status(409).json({
                    respuesta: "Ya existe un tipo de vehículo con este nombre",
                });
            }

            const resultado = await pool.result(SQL_TIPO_VEHICULO.UPDATE, [
                objTipoVehiculo.claseTipoVehiculo,
                objTipoVehiculo.codTipoVehiculo,
            ]);

            if (resultado.rowCount === 0) {
                return res.status(500).json({
                    respuesta: "No se pudo actualizar el tipo de vehículo",
                });
            }

            res.status(200).json({
                respuesta: "Tipo de vehículo actualizado correctamente",
                detalles: {
                    filasActualizadas: resultado.rowCount,
                    codigoTipoVehiculo: objTipoVehiculo.codTipoVehiculo,
                    nuevoNombre: objTipoVehiculo.claseTipoVehiculo,
                },
            });
        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al actualizar el tipo de vehículo",
            });
        }
    }
}

export default ServicioTipoVehiculoActualizar;

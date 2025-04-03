import { Response } from "express";
import TipoVehiculo from "../model/TipoVehiculo";
import pool from "../../../config/connection/dbConnection";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipo_vehiculo";
import { SQL_TARIFA_DIARIA } from "../../tarifa_diaria/repository/sql_tarifa_diaria";

class ServicioTipoVehiculoBorrar {
    protected static async borrar(
        obj: TipoVehiculo,
        res: Response
    ): Promise<any> {
        try {
            const existeRegistro = await pool.oneOrNone(
                SQL_TIPO_VEHICULO.FIND_BY_ID,
                [obj.codTipoVehiculo]
            );

            if (!existeRegistro) {
                return res.status(404).json({
                    respuesta: "El tipo de vehículo no existe"
                });
            }

            const tarifasRelacionadas = await pool.any(
                SQL_TARIFA_DIARIA.FIND_BY_ID_TIPO_VEHICULO,
                [obj.codTipoVehiculo]
            );

            if (tarifasRelacionadas && tarifasRelacionadas.length > 0) {
                return res.status(400).json({
                    respuesta: "No se puede eliminar el tipo de vehículo porque está relacionado a una o más tarifas diarias",
                    tarifasRelacionadas: tarifasRelacionadas
                });
            }

            const respuesta = await pool.result(
                SQL_TIPO_VEHICULO.DELETE,
                [obj.codTipoVehiculo]
            );

            if (respuesta.rowCount === 0) {
                return res.status(400).json({
                    respuesta: "No se pudo eliminar el registro"
                });
            }

            res.status(200).json({
                respuesta: "Registro eliminado correctamente",
                "Filas borradas": respuesta.rowCount,
            });

        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al intentar eliminar"
            });
        }
    }
}

export default ServicioTipoVehiculoBorrar;
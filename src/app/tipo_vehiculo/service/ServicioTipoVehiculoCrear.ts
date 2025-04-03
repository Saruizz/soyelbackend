import { Response } from "express";
import TipoVehiculo from "../model/TipoVehiculo";
import pool from "../../../config/connection/dbConnection";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipo_vehiculo";

class ServicioTipoVehiculoCrear {
    protected static async grabarTipoVehiculo(
        obj: TipoVehiculo,
        res: Response
    ): Promise<any> {
        try {
            if (!obj || !obj.claseTipoVehiculo) {
                return res.status(400).json({
                    respuesta: "Datos de tipo de vehículo inválidos",
                });
            }

            const resultado = await pool.task(async (consulta) => {
                const tiposVehiculos = await consulta.one(SQL_TIPO_VEHICULO.HOW_MANY, [
                    obj.claseTipoVehiculo,
                ]);

                if (tiposVehiculos.cantidad > 0) {
                    return { caso: 1 };
                }

                const objGrabado = await consulta.one(SQL_TIPO_VEHICULO.ADD, [
                    obj.claseTipoVehiculo,
                ]);

                return { caso: 2, objGrabado };
            });

            switch (resultado.caso) {
                case 1:
                    // Tipo de vehículo ya existe
                    return res.status(409).json({
                        respuesta: "El tipo de vehículo ya existe",
                    });
                case 2:
                    // Tipo de vehículo creado exitosamente
                    return res.status(201).json(resultado.objGrabado);
                default:
                    // Caso inesperado
                    return res.status(500).json({
                        respuesta: "Error inesperado al crear tipo de vehículo",
                    });
            }
        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al crear tipo de vehículo",
            });
        }
    }
}

export default ServicioTipoVehiculoCrear;

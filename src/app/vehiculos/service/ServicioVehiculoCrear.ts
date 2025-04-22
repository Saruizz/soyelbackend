import { Request, Response } from "express";
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
                !obj.placaVehiculo ||
                !obj.codTipoVehiculo ||
                !obj.codUsuario
            ) {
                return res.status(400).json({
                    respuesta: "Datos de vehículo inválidos",
                });
            }

            const resultado = await pool.task(async (consulta) => {
                const vehiculos = await consulta.one(SQL_VEHICULO.HOW_MANY, [
                    obj.placaVehiculo,
                ]);

                if (vehiculos.cantidad > 0) {
                    return { caso: 1 };
                }

                const objGrabado = await consulta.one(SQL_VEHICULO.ADD, [
                    obj.codTipoVehiculo,
                    obj.codUsuario,
                    obj.placaVehiculo,
                ]);

                return { caso: 2, objGrabado };
            });

            switch (resultado.caso) {
                case 1:
                    // Vehículo ya existe
                    return res.status(409).json({
                        respuesta: "El vehículo ya existe",
                    });
                case 2:
                    // Vehículo creado exitosamente
                    return res.status(201).json(resultado.objGrabado);
                default:
                    // Caso inesperado
                    return res.status(500).json({
                        respuesta: "Error inesperado al crear vehículo",
                    });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                respuesta: "Error interno al crear el vehículo",
            });
        }
    }
}

export default ServicioVehiculoCrear;

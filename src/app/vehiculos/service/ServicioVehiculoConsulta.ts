import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_VEHICULO } from "../repository/sql_vehiculo";

class ServicioVeiculoConsulta {
    protected static async obtenerTodos(
        res: Response
    ): Promise<any> {
        try {
            const misDatos = await pool.result(SQL_VEHICULO.FIND_ALL);

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron vehículos",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de vehículos exitosa",
                cantidad: misDatos.rows.length,
                vehiculos: misDatos.rows,
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar vehículos",
            });
        }
    }

    protected static async obtenerPorCodVehiculo(
        req: Request,
        res: Response
    ): Promise<any> {
        const { codVehiculo } = req.params;

        try {
            const misDatos = await pool.result(SQL_VEHICULO.FIND_BY_PRIMARY_KEY, [
                codVehiculo,
            ]);

            if (!misDatos) {
                return res.status(404).json({
                    respuesta: "No se encontró el vehículo con el código especificado",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de vehículo por código exitosa",
                cantidad: 1,
                vehiculo: misDatos,
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar vehículo por código",
            });
        }
    }

    protected static async obtenerPorTipoVehiculo(
        req: Request,
        res: Response
    ): Promise<any> {
        const { codTipoVehiculo } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_VEHICULO.FIND_BY_ID_TIPO_VEHICULO,
                [codTipoVehiculo]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta:
                        "No se encontraron vehículos para el tipo de vehículo especificado",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de vehículos por código tipo vehiculo exitosa",
                cantidad: misDatos.rows.length,
                vehiculos: misDatos.rows,
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar vehículos por tipo de vehículo",
            });
        }
    }

    protected static async obtenerPorUsuario(req: Request, res: Response): Promise<any> {
        const { codUsuario } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_VEHICULO.FIND_BY_ID_USUARIO,
                [codUsuario]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta:
                        "No se encontraron vehículos para el usuario especificado",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de vehículos por código usuario exitosa",
                cantidad: misDatos.rows.length,
                vehiculos: misDatos.rows,
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar vehículos por usuario",
            });
        }
    }

    protected static async obtenerPorPlaca(req: Request, res: Response): Promise<any> {
        const { placaVehiculo } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_VEHICULO.FIND_BY_PLACA,
                [placaVehiculo]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta:
                        "No se encontro vehículo para la placa especificada",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de vehículo por placa exitosa",
                cantidad: misDatos.rows.length,
                vehiculos: misDatos.rows,
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar vehículos por placa",
            });
        }
    }
    protected static async obtenerPorParqueadero(req: Request, res: Response): Promise<any> {
        const { codParqueadero } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_VEHICULO.FIND_BY_ID_PARQUEADERO,
                [codParqueadero]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta:
                        "No se encontraron vehículos para el parqueadero especificado",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de vehículos por código parqueadero exitosa",
                cantidad: misDatos.rows.length,
                vehiculos: misDatos.rows,
            });
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar vehículos por parqueadero",
            });
        }
    }
}

export default ServicioVeiculoConsulta;

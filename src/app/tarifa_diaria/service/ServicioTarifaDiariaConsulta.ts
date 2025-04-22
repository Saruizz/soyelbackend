import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";
import TarifaDiaria from "../model/TarifaDiaria";


class ServicioTarifaDiariaConsulta {
    // Obtener todas las tarifas diarias
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const misDatos = await pool.result(SQL_TARIFA_DIARIA.FIND_ALL);

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron tarifas diarias",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de tarifas diarias exitosa",
                cantidad: misDatos.rows.length,
                tarifasDiarias: misDatos.rows
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar tarifas diarias",
            });
        }
    }

    // Obtener una tarifa diaria específica por su clave primaria
    protected static async obtenerUno(req: Request, res: Response): Promise<any> {
        const { codParqueadero, codTipoVehiculo } = req.params;

        try {
            const miDato = await pool.oneOrNone(
                SQL_TARIFA_DIARIA.FIND_BY_PRIMARY_KEY,
                [codParqueadero, codTipoVehiculo]
            );

            if (!miDato) {
                return res.status(404).json({
                    respuesta: "No se encontró la tarifa diaria solicitada",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de tarifa diaria exitosa",
                cantidad: 1,
                tarifaDiaria: miDato
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar la tarifa diaria",
            });
        }
    }

    // Obtener tarifas diarias por código de parqueadero
    protected static async obtenerPorParqueadero(req: Request, res: Response): Promise<any> {
        const { codParqueadero } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_TARIFA_DIARIA.FIND_BY_ID_PARQUEADERO,
                [codParqueadero]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron tarifas diarias para el parqueadero especificado",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de tarifas diarias por código de parqueadero exitosa",
                cantidad: misDatos.rows.length,
                tarifasDiarias: misDatos.rows
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar tarifas diarias por parqueadero",
            });
        }
    }

    // Obtener tarifas diarias por código de tipo de vehículo
    protected static async obtenerPorTipoVehiculo(req: Request, res: Response): Promise<any> {
        const { codTipoVehiculo } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_TARIFA_DIARIA.FIND_BY_ID_TIPO_VEHICULO,
                [codTipoVehiculo]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron tarifas diarias para el tipo de vehículo especificado",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de tarifas diarias por código tipo vehiculo exitosa",
                cantidad: misDatos.rows.length,
                tarifasDiarias: misDatos.rows
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar tarifas diarias por tipo de vehículo",
            });
        }
    }
}

export default ServicioTarifaDiariaConsulta;
import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_PUESTO } from "../repository/sql_puesto";
import Puesto from "../model/Puesto";

class ServicioPuestoConsulta {
//obtener todas los puestos diarios
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const misDatos = await pool.result(SQL_PUESTO.FIND_ALL);

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron puestos",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de puestos exitosa",
                cantidad: misDatos.rows.length,
                puestos: misDatos.rows
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar puestos",
            });
        }
    }

    // Obtener un puesto específico por su clave primaria

    protected static async obtenerUno(req: Request, res: Response): Promise<any> {
        const { codParqueadero, codPuesto } = req.params;

        try {
            const miDato = await pool.oneOrNone(
                SQL_PUESTO.FIND_BY_PRIMARY_KEY,
                [codParqueadero, codPuesto]
            );

            if (!miDato) {
                return res.status(404).json({
                    respuesta: "No se encontró el puesto solicitado",
                });
            }

            // Crear una instancia de la entidad con los datos obtenidos
            const puesto = new Puesto(
                miDato.codpuesto,
                miDato.codparqueadero,
                miDato.codtipovehiculo,
                miDato.estado
            );

            res.status(200).json({
                respuesta: "Consulta de puesto exitosa",
                cantidad: 1,
                puesto: miDato
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar el puesto",
            });
        }
    }

}
export default ServicioPuestoConsulta;
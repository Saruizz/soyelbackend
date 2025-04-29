import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_SERVICIO_DIARIO } from "../repository/sql_servicio_diario";
import ServicioDiario from "../model/ServicioDiario";

class ServicioDiarioConsulta {
    // Obtener todos los servicios diarios
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const misDatos = await pool.result(SQL_SERVICIO_DIARIO.FIND_ALL);

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron servicios diarios",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de servicios diarios exitosa",
                cantidad: misDatos.rows.length,
                serviciosDiarios: misDatos.rows
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar servicios diarios",
            });
        }
    }

    // Obtener un servicio diario específico por su clave primaria
    protected static async obtenerUno(req: Request, res: Response): Promise<any> {
        const { cod_servicio_diario } = req.params;

        try {
            const miDato = await pool.oneOrNone(
                SQL_SERVICIO_DIARIO.FIND_BY_PRIMARY_KEY,
                [cod_servicio_diario]
            );

            if (!miDato) {
                return res.status(404).json({
                    respuesta: "No se encontró el servicio diario solicitado",
                });
            }

            // Crear una instancia de la entidad con los datos obtenidos
          const servicioDiario = new ServicioDiario(
                miDato.cod_servicio_diario,
                miDato.cod_parqueadero,
                miDato.cod_tipo_vehiculo,
                miDato.fecha_servicio,
                miDato.hora_ingreso,
                miDato.hora_salida,
                miDato.valor_total_servicio
        );

            res.status(200).json({
                respuesta: "Consulta de servicio diario exitosa",
                cantidad: 1,
                servicioDiario: miDato
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar servicio diario",
            });
        }

    }
    //Obtener servicio diario por el codigo de servicio
    protected static async obtenerPorCodigoServicio(req: Request, res: Response): Promise<any> {
        const { cod_servicio_diario } = req.params;

        try {
            const misDatos = await pool.result(
                SQL_SERVICIO_DIARIO.FIND_BY_PRIMARY_KEY,
                [cod_servicio_diario]
            );

            if (misDatos.rows.length === 0) {
                return res.status(404).json({
                    respuesta: "No se encontraron servicios diarios",
                });
            }

            res.status(200).json({
                respuesta: "Consulta de servicios diarios exitosa",
                cantidad: misDatos.rows.length,
                serviciosDiarios: misDatos.rows
            });

        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar servicios diarios",
            });
        }
    }
}
export default ServicioDiarioConsulta;

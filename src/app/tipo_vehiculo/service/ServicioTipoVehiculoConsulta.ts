import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TIPO_VEHICULO } from "../repository/sql_tipo_vehiculo";

class ServicioTipoVehiculoConsulta {
    protected static async obtenerTodos(res: Response): Promise<any> {
        try {
            const misDatos = await pool.result(SQL_TIPO_VEHICULO.FIND_ALL);

            if (misDatos.rows.length === 0) {
                res.status(404).json({
                    respuesta: "No se encontraron tipos de vehículo"
                });
                return; // Solo devolver para detener la ejecución, no devolver el resultado de res.status
            }

            res.status(200).json({
                respuesta: "Consulta de tipos de vehiculos exitosa",
                cantidad: misDatos.rows.length,
                tiposVehiculos: misDatos.rows
            });

        } catch (miError) {
            console.error(miError);
            res.status(500).json({
                respuesta: "Error interno al consultar tipos de vehículo"
            });
        }
    }
}

export default ServicioTipoVehiculoConsulta;
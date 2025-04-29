import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_UBICACION } from "../repository/sql_ubicacion";

class ServicioUbicacionConsulta{
    protected static async obtenerTodos(res: Response) : Promise<any> {
        await pool
            .result(SQL_UBICACION.FIND_ALL)
            .then((misDatos) => {
                res.status(200).json(misDatos.rows);
            })
            .catch((miError:any) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totio el SQL mano"});
            });
    }
}
export default ServicioUbicacionConsulta;
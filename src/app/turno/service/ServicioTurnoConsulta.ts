import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TURNO } from "../repository/sql_turno";

class ServicioTurnoConsulta{
    protected static async obtenerTodos(res: Response) : Promise<any> {
        await pool
            .result(SQL_TURNO.FIND_ALL)
            .then((misDatos) => {
                res.status(200).json(misDatos.rows);
            })
            .catch((miError:any) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totio el SQL mano"});
            });
    }
}
export default ServicioTurnoConsulta;
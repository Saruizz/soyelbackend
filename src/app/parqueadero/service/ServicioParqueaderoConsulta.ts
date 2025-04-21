import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_PARQUEADERO } from "../repository/sql_parqueadero";

class ServicioParqueaderoConsulta{
    protected static async obtenerTodos(res: Response) : Promise<any> {
        await pool
            .result(SQL_PARQUEADERO.FIND_ALL)
            .then((misDatos) => {
                res.status(200).json(misDatos.rows);
            })
            .catch((miError:any) => {
                console.log(miError);
                res.status(400).json({ respuesta: "Se totio el SQL mano"});
            });
    }
}
export default ServicioParqueaderoConsulta;
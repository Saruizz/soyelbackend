import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_accesos } from "../repository/sql_accesos";

class ServiceAccessGet {
    protected static async getAll(res: Response):Promise<any>{
        await pool
        .result(sql_accesos.getAll)
        .then((datos)=>{
            res.status(200).json({
                respuesta: "Accesos obtenidos exitosamente",
                result: datos.rows,
              });
        }).catch((Error)=>{
            console.log(Error);
            res
              .status(400)
              .json({
                Respuesta: "Error al obtener los accesos",
                result: Error,
              });
        });
    }
}

export default ServiceAccessGet;

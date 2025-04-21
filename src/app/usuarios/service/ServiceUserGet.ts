import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_usuarios } from "../repository/sql_user";

class ServiceUserGet {
  protected static async obtenerUsuarios(
    res: Response
  ): Promise<any> {
    await pool
      .result(sql_usuarios.FIND_ALL)
      .then((misDatos) => {
        res.status(200).json({usuario: misDatos.rows});
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al obtener usuario" });
      });
  }
}
export default ServiceUserGet;

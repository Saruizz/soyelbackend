import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sql_usuarios } from "../repository/sql_user";

class ServiceUserGet {
  protected static async obtenerUsuarios(
    res: Response
  ): Promise<any> {
    await pool
      .result(sql_usuarios.FIND_ALL)
      .then((misDatos: any) => {
        res.status(200).json({ usuario: misDatos.rows });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al obtener usuario" });
      });
  }
  protected static async getUserById(codUsuario: number, res: Response): Promise<any> {
    await pool
      .result(sql_usuarios.FIND_BY_ID, [codUsuario])
      .then((misDatos: any) => {
        res.status(200).json({ usuario: misDatos.rows });
      })
      .catch((miError: any) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al obtener usuario" });
      });
  }
}
export default ServiceUserGet;

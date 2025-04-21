import pool from "../../../config/connection/dbConnection";
import { Response } from "express";
import Turno from "../model/Turno";
import { SQL_TURNO } from "../repository/sql_turno";

class ServicioTurnoBorrar {
  public static async borrar(codigo: number, res: Response): Promise<any> {
    await pool
      .task((consulta) => {
        return consulta.result(SQL_TURNO.DELETE, [codigo]); // Usar el código directamente
      })
      .then((respuesta) => {
        res.status(200).json({
          respuesta: "Ya lo borré",
          "filas borradas": respuesta.rowCount,
        });
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al eliminar" });
      });
  }
}

export default ServicioTurnoBorrar;
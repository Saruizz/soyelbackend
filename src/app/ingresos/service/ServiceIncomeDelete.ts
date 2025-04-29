import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import sqlIngreso from "../repository/sql_ingreso";
import Ingreso from "../model/Ingreso";

class ServiceIncomeDelete {
  protected static async deleteIncome(obj: any, res: Response) {
    await pool
      .task(async (consulta) => {
        const ingreso = await consulta.any(sqlIngreso.DELETE, [obj.codIngreso]);
        return { objeto: ingreso };
      })
      .then(({ objeto }) => {
        res.status(200).json({ respuesta: "Ingreso eliminado correctamente", detalle: objeto });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .json({
            respuesta: "Error al eliminar el ingreso",
            error: error.message,
          });
      });
  }
}
export default ServiceIncomeDelete;
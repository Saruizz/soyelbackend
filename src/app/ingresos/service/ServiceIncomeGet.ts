import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import sqlIngreso from "../repository/sql_ingreso";
import Ingreso from "../model/Ingreso";

class ServicesIncomeGet {
  protected static async getIncome(res: Response) {
    await pool
      .task(async (consulta) => {
        const ingresos = await consulta.any(sqlIngreso.GETALL);
        return { ingresos };
      })
      .then(({ ingresos }) => {
        res.status(200).json({ ingresos });
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .json({
            respuesta: "Error al obtener los ingresos",
            error: error.message,
          });
      });
  }
}
export default ServicesIncomeGet;
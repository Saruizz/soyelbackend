import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import sqlIngreso from "../repository/sql_ingreso";
import Ingreso from "../model/Ingreso";

class ServicesIncomeAdd {
  protected static async addIncome(obj: Ingreso, res: Response) {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        const user = await consulta.oneOrNone(sqlIngreso.GETUSERBYID, [
          obj.codUsuario,
        ]);
        if (!user) {
          caso = 2;
        }

        if (caso === 1) {
          await consulta.oneOrNone(sqlIngreso.INSERT, [
            obj.codUsuario,
            obj.fechaIngreso,
            obj.horaIngreso,
          ]);
        }
        return { caso, obj };
      })
      .then(({ caso, obj }) => {
        switch (caso) {
          case 1:
            res
              .status(200)
              .json({ respuesta: "Ingreso agregado correctamente", detalle: obj });
            break;
          case 2:
            res
              .status(400)
              .json({ respuesta: "El usuario no existe en la base de datos" });
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res
          .status(400)
          .json({
            respuesta: "Error al agregar el ingreso",
            error: error.message,
          });
      });
  }
}

export default ServicesIncomeAdd;

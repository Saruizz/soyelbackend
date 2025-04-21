import { Request, Response } from "express";
import Functionality from "../model/Functionality";
import pool from "../../../config/connection/dbConnection";
import { sql_functionality } from "../repository/sql_functionality";

class ServiceFunctionalityCreate {
  protected static async create(obj: Functionality, res: Response) {
    await pool
      .task(async (consulta) => {
        const result = await consulta.none(sql_functionality.create, [
          obj.codPadreFuncionalidad,
          obj.nombreFuncionalidad,
          obj.urlFuncionalidad,
        ]);

        return { caso: 1, result };
      })
      .then(({ caso, result }) => {
        switch (caso) {
          case 2:
            res.status(400).json({
              respuesta: "La funcionalidad ya existe en la base de datos",
              detalle: result,
            });
            break;

          default:
            res.status(200).json({
              respuesta: "Funcionalidad creada correctamente",
              detalle: result,
            });
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al crear la funcionalidad",
          detalle: error.message,
          error: error,
        });
      });
  }
}
export default ServiceFunctionalityCreate;

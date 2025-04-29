import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import sqlIngreso from "../repository/sql_ingreso";
import Ingreso from "../model/Ingreso";

class ServiceIncomeUpdate {
    protected static async updateIncome(obj: Ingreso, res: Response) {
        await pool
          .task(async (consulta) => {
            let caso = 1;
            const ingreso = await consulta.oneOrNone(sqlIngreso.GETBYID, [obj.codIngreso]);
            if (!ingreso) {
                caso = 2;
            }else{
                await consulta.none(sqlIngreso.UPDATE,[obj.codIngreso, obj.codUsuario, obj.fechaIngreso, obj.horaIngreso]);
            }
            return { caso, obj };
          })
          .then(({ caso, obj }) => {
            if(caso == 1){
                res.status(200).json({ respuesta: "Ingreso actualizado correctamente", detalle: obj });
            }else{
                res.status(400).json({ respuesta: "Ingreso no encontrado" });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(400)
              .json({
                respuesta: "Error al actualizar el ingreso",
                error: error.message,
              });
          });
      }
}
export default ServiceIncomeUpdate;

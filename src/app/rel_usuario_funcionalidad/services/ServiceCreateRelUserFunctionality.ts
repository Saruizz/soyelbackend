import { Response } from "express";
import RelUserFunctionality from "../model/RelUserFunctionality";
import pool from "../../../config/connection/dbConnection";
import { sqlRelUserFunctionality } from "../repository/sql_RelUserFunctionality";

class ServiceCreateRelUserFunctionality{
    protected static async create(obj:RelUserFunctionality,res:Response){
        await pool.task(async (task) => {
            const result = await task.none(sqlRelUserFunctionality.create, [obj.codUsuario, obj.codFuncionalidad]);
            return { result };
          }).then(({ result }) => {
            res.status(200).json({
              respuesta: "Relación usuario funcionalidad creada correctamente",
              detalle: result
            });
          }).catch((error) => {
            console.log(error);
            res.status(500).json({
              respuesta: "Error al crear la relación usuario funcionalidad",
              detalle: error.message
            });
          })
    }
}
export default ServiceCreateRelUserFunctionality;
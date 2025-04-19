import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sqlRelUserFunctionality } from "../repository/sql_RelUserFunctionality";

class ServiceGetAllRelUserFunctional{
    protected static async getAllRelUserFunctionality(res:Response){
        await pool.task(async (task) => {
            const relUserFunctionality = await task.any(sqlRelUserFunctionality.getAll);
            return { relUserFunctionality };
        }).then(({ relUserFunctionality }) => {
            res.status(200).json({
                respuesta: "Relaciones usuario funcionalidad obtenidas correctamente",
                detalle: relUserFunctionality
            });
        }).catch((error) => {
            console.log(error);
            res.status(500).json({
                respuesta: "Error al obtener las relaciones usuario funcionalidad",
                detalle: error.message
            });
        })
    }
}
export default ServiceGetAllRelUserFunctional;
import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sql_functionality } from "../repository/sql_functionality";

class ServiceFunctionalityGet{
    protected static async getAll(res:Response){
        await pool
        .task(async(consulta)=>{
            const functionality = await consulta.any(sql_functionality.getAll);
            return functionality;
        }).then((functionality)=>{
            res.status(200).json({
                respuesta: "Funcionalidades obtenidas correctamente",
                detalle: functionality
            })
        }).catch((error)=>{
            console.log(error);
            res.status(400).json({
                respuesta: "Error al obtener las funcionalidades",
                detalle: error.message
            })
        })
    }
}

export default ServiceFunctionalityGet;
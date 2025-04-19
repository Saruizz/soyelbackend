import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import SQL_REL_ROL_FUNCIONALIDAD from "../repository/sql_rel_rol_funcionalidad";

class ServiceGetRelRolFunctionality{
    protected static async getAll(res:Response){
        await pool.task(async (consulta)=>{
             let caso = 1;
             const rel_rol_functionality = await consulta.any(SQL_REL_ROL_FUNCIONALIDAD.getAll);
             if(!rel_rol_functionality){
                 caso = 2;
             }
             return { caso, rel_rol_functionality };
        }).then(({ caso, rel_rol_functionality }) => {
            if(caso == 1){
                res.status(200).json({
                    respuesta: "Relaciones de rol con funcionalidades obtenidas correctamente",
                    detalle: rel_rol_functionality
                })
            }else{
                res.status(400).json({
                    respuesta: "No se encontraron relaciones de rol con funcionalidades"
                })
            }
        }).catch((error) => {
            console.log(error);
            res.status(400).json({
                respuesta: "Error al obtener las relaciones de rol con funcionalidades",
                detalle: error.message
            })
        })
    }
}

export default ServiceGetRelRolFunctionality;

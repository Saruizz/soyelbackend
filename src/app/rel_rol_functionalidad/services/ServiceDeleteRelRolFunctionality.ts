import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";
import { sql_functionality } from "../../funcionalidades/repository/sql_functionality";

class ServiceDeleteRelRolFunctionality{
    protected static async delete(obj:Rel_rol_funcionalidad,res:Response){
        await pool.task(async (consulta)=>{
            await consulta.none(sql_functionality.delete,[obj.cod_funcionalidad,obj.cod_rol]);
        }).then(()=>{
            res.status(200).json({
                message: 'Relacion rol funcionalidad eliminada exitosamente'
            })
        }).catch((error:any)=>{
            console.log(error)
            res.status(400).json({
                message: 'Error al eliminar la relacion rol funcionalidad',
            })
        })
    }
}
export default ServiceDeleteRelRolFunctionality;
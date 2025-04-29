import { Response } from "express";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";
import pool from "../../../config/connection/dbConnection";

class ServiceCreateRelRolFunctionality{
    protected static async create(obj:Rel_rol_funcionalidad,res:Response){
        await pool.task(async (consulta)=>{
            await consulta.query('INSERT INTO rel_rol_funcionalidad (cod_rol, cod_funcionalidad) VALUES (?, ?)', [obj.cod_rol, obj.cod_funcionalidad]);
        }).then(()=>{
            res.status(200).json({
                message: 'Relacion rol funcionalidad creada exitosamente'
            })
        }).catch((error:any)=>{
            console.log(error)
            res.status(400).json({
                message: 'Error al crear la relacion rol funcionalidad',
            })
        })
    }
}

export default ServiceCreateRelRolFunctionality;
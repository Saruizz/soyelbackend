import { Request,Response } from "express";
import { json } from "express";
import pool from "../../../config/connection/dbConnection";
import Parqueadero from "../model/Parqueadero";
import { SQL_PARQUEADERO } from "../repository/sql_parqueadero";

class ServicioParqueaderoBorrar{
    protected static async borrar(obj: Parqueadero, res: Response):
    Promise<any>{
        await pool
        .task(async (consulta)=>{
            let caso = 1;
            let objBorrado: any ;
            const parqueos = await consulta.one(SQL_PARQUEADERO.HOW_MANY_COD, [obj.codParqueadero]);
            const turnos = await consulta.one(SQL_PARQUEADERO.HOW_MANY_TURNOS, [obj.codParqueadero]);
                if (turnos.cantidad == 0 && parqueos.cantidad > 0){
                    caso=2;
                    objBorrado = await consulta.result(SQL_PARQUEADERO.DELETE,[obj.codParqueadero]);
                } else {
                    if(parqueos.cantidad== 0){
                        caso=3;
                    }
                }
                return  {caso, objBorrado};
            })
            .then(({caso, objBorrado})=>{
                switch (caso){
                    case 1:
                        res.status(400).json({respuesta: "Parquedero se encuentra referenciado con uno o mas turnos"});
                        break;
                    case 2:
                        res.status(200).json({
                        respuesta: "Registro borrado con exito"});
                        break;
                    case 3:
                        res.status(200).json({
                        respuesta: "Parqueadero no existe"});
                        break;
                    default:
                        res.status(200).json(objBorrado);
                }
        })
        .catch((miError)=>{
            console.log(miError);
            res.status(400).json({respuesta: "Error eliminando el registro"});
        });
    }
}
export default ServicioParqueaderoBorrar;
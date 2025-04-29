import { Request,Response } from "express";
import { json } from "express";
import pool from "../../../config/connection/dbConnection";
import Turno from "../model/Turno";
import { SQL_TURNO } from "../repository/sql_turno";

class ServicioTurnoBorrar{
    protected static async borrar(obj: Turno, res: Response):
    Promise<any>{
        await pool
        .task(async (consulta)=>{
            let caso = 1;
            let objBorrado: any ;
            const parqueos = await consulta.one(SQL_TURNO.HOW_MANY_PARQUEADEROS, [obj.codTurno]);
            const turnos = await consulta.one(SQL_TURNO.HOW_MANY_COD, [obj.codTurno]);
            if (turnos.cantidad > 0 && parqueos.cantidad == 0){
                caso=2;
                objBorrado = await consulta.result(SQL_TURNO.DELETE,[obj.codTurno]);
            } else {
                if(turnos.cantidad== 0){
                    caso=3;
                }
            }
            return  {caso, objBorrado};
        })
        .then(({caso, objBorrado})=>{
            switch (caso){
                case 1:
                    res.status(400).json({respuesta: "Turno se encuentra referenciado"});
                    break;
                case 2:
                    res.status(200).json({
                        respuesta: "Registro borrado con exito"});
                    break;
                case 3:
                    res.status(200).json({
                        respuesta: "Turno no existe"});
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
export default ServicioTurnoBorrar;
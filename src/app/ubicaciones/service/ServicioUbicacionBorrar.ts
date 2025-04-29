import { Request,Response } from "express";
import { json } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_UBICACION } from "../repository/sql_ubicacion";
import Ubicacion from "../model/Ubicacion";

class ServicioUbicacionBorrar{
    protected static async borrar(obj: Ubicacion, res: Response):
    Promise<any>{
        await pool
        .task(async (consulta)=>{
            let caso = 1;
            let objBorrado: any ;
            const ubica = await consulta.one(SQL_UBICACION.HOW_MANY_COD, [obj.codUbicacion]);
            const parqueos = await consulta.one(SQL_UBICACION.HOW_MANY_PARQUEADEROS, [obj.codUbicacion]);
                if (parqueos.cantidad == 0 && ubica.cantidad == 1){
                    caso=2;
                    objBorrado = await consulta.result(SQL_UBICACION.DELETE,[obj.codUbicacion]);
                } else {
                    if(ubica.cantidad== 0){
                        caso=3;
                    }
                }
                return  {caso, objBorrado};
            })
            .then(({caso, objBorrado})=>{
                switch (caso){
                    case 1:
                        res.status(400).json({respuesta: "Ubicacion se encuentra referenciado con uno o mas parqueaderos o ubicaciones"});
                        break;
                    case 2:
                        res.status(200).json({
                        respuesta: "Registro borrado con exito"});
                        break;
                    case 3:
                        res.status(200).json({
                        respuesta: "Ubicacion no existe"});
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
export default ServicioUbicacionBorrar;
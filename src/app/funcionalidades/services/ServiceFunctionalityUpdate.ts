import { Response } from "express";
import Functionality from "../model/Functionality";
import pool from "../../../config/connection/dbConnection";
import { sql_functionality } from "../repository/sql_functionality";

class ServiceFunctionalityUpdate{
    protected static async update(obj:Functionality, res:Response){
        await pool.task(async (consulta) => {
            let caso = 1;
            const functionality = await consulta.oneOrNone(sql_functionality.getById, [obj.codFuncionalidad]);
            if(!functionality){
                caso = 2;
            }else{
                await consulta.none(sql_functionality.update, [obj.codFuncionalidad, obj.codPadreFuncionalidad, obj.nombreFuncionalidad, obj.urlFuncionalidad]);
            }
            return { caso, obj };
        })
        .then(({ caso, obj }) => {
            switch (caso) {
                case 2:
                    res.status(400).json({
                        respuesta: "La funcionalidad no existe en la base de datos",
                        detalle: obj,
                    });
                    break;
                default:
                    res.status(200).json({
                        respuesta: "Funcionalidad actualizada correctamente",
                        detalle: obj,
                    });
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                respuesta: "Error al actualizar la funcionalidad",
                detalle: error.message,
                error: error,
            });
        });
    }
}
export default ServiceFunctionalityUpdate;
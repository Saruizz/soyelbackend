import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sql_functionality } from "../repository/sql_functionality";

class ServiceFunctionalityDelete {
    protected static async delete(id:number, res: Response) {
        await pool.task(async (consulta:any) => {
            let caso =  1;
            const result = await consulta.none(sql_functionality.delete, [id]);
            if(result){
                return { caso, result };
            }else{
                caso = 2;
                return { caso, result };
            }
        })
        .then(({ caso, result }) => {
            switch (caso) {
                case 2:
                    res.status(400).json({
                        respuesta: "La funcionalidad no existe en la base de datos",
                        detalle: result,
                    });
                    break;
                default:
                    res.status(200).json({
                        respuesta: "Funcionalidad eliminada correctamente",
                        detalle: result,
                    });
                    break;
            }
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({
                respuesta: "Error al eliminar la funcionalidad",
                detalle: error.message,
                error: error,
            });
        });
    }   
}

export default ServiceFunctionalityDelete;


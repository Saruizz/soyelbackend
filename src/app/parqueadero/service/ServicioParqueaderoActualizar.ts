import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import Parqueadero from "../model/Parqueadero";
import { SQL_PARQUEADERO } from "../repository/sql_parqueadero";


class ServicioParqueaderoActualizar {

    protected static async actualizarParqueadero(
        objParqueadero: Parqueadero,
        res: Response
        ): Promise<any> {
        await pool
        .task(async(consulta)=> {
            let caso = 1;
            let objActualizado: any;

            const roles = await consulta.one(SQL_PARQUEADERO.HOW_MANY, [objParqueadero.nombreParqueadero]);
            if (roles.cantidad == 0){
                caso = 2 ;
                objActualizado = await consulta.result(SQL_PARQUEADERO.UPDATE, [
                    objParqueadero.codParqueadero,
                    objParqueadero.codUbicacion,
                    objParqueadero.nombreParqueadero,
                    objParqueadero.dirParqueadero,
                    objParqueadero.telParqueadero,
                ]);
            }
            return {caso, objActualizado};
        })
        .then(({caso, objActualizado})=>{
            switch (caso){
                case 1:
                    res
                        .status(400)
                        .json({ respuesta: "Ya existe un Parqueadero con el mismo nombre"});
                    break;
                default:
                    res
                        .status(200)
                        .json({
                            respuesta: "Todo bien",
                            detalle: objActualizado.rowCount,
                        });
            }
        }).catch((miError: any)=>{
            console.log(miError);
            res.status(400).json({respuesta: "Pailas grave"});
        });
    }
}
export default ServicioParqueaderoActualizar;
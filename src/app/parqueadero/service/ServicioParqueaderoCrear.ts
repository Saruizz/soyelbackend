import { Response } from "express";

import pool from "../../../config/connection/dbConnection";
import Parqueadero from "../model/Parqueadero";
import { SQL_PARQUEADERO } from "../repository/sql_parqueadero";

class ServicioParqueaderoCrear {
    protected static async grabarParqueadero(obj: Parqueadero, res: Response): Promise<any>{
        await pool
            .task(async (consulta)=> {
                let caso = 1;
                let objGrabado: any;

                const parqueaderos = await consulta.one(SQL_PARQUEADERO.HOW_MANY, [obj.nombreParqueadero]);
                if (parqueaderos.cantidad == 0){
                    caso=2;
                    objGrabado= await consulta.one(SQL_PARQUEADERO.ADD, [obj.codUbicacion, obj.nombreParqueadero, obj.dirParqueadero, obj.telParqueadero]);
                }
                return { caso, objGrabado};
            })
            .then(({caso, objGrabado})=>{
                switch (caso){
                    case 1:
                        res.status(400).json({respuesta: "Parqueadero ya existe"});
                        break;
                    default:
                        res.status(200).json(objGrabado);
                }
            })
            .catch((miError)=> {
            console.log(miError);
            res.status(400).json({respuesta: "Pailas SQL"});
        });
    }
}

export default ServicioParqueaderoCrear;
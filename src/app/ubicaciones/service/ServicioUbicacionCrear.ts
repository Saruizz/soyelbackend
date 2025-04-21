import { Response } from "express";

import pool from "../../../config/connection/dbConnection";
import Parqueadero from "../model/Ubicacion";
import { SQL_UBICACION } from "../repository/sql_ubicacion";

class ServicioUbicacionCrear {
    protected static async grabarUbicacion(obj: Parqueadero, res: Response): Promise<any>{
        await pool
            .task(async (consulta)=> {
                let caso = 1;
                let objGrabado: any;

                const parqueaderos = await consulta.one(SQL_UBICACION.HOW_MANY, [obj.nombreUbicacion]);
                if (parqueaderos.cantidad == 0){
                    caso=2;
                    objGrabado= await consulta.one(SQL_UBICACION.ADD, [obj.codPadreUbicacion,obj.codExternoUbicacion,obj.nombreUbicacion]);
                }
                return { caso, objGrabado};
            })
            .then(({caso, objGrabado})=>{
                switch (caso){
                    case 1:
                        res.status(400).json({respuesta: "Ubicacion ya existe"});
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

export default ServicioUbicacionCrear;
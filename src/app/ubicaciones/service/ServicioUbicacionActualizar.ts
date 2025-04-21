import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import Parqueadero from "../model/Ubicacion";
import { SQL_UBICACION } from "../repository/sql_ubicacion";
import Ubicacion from "../model/Ubicacion";


class ServicioUbicacionActualizar {

    protected static async actualizarUbicacion(
        objUbicacion: Ubicacion,
        res: Response
        ): Promise<any> {
        await pool
        .task(async(consulta)=> {
            let caso = 1;
            let objActualizado: any;

            const ubicaciones = await consulta.one(SQL_UBICACION.HOW_MANY, [objUbicacion.nombreUbicacion]);
            if (ubicaciones.cantidad == 0){
                caso = 2 ;
                objActualizado = await consulta.result(SQL_UBICACION.UPDATE, [
                    objUbicacion.codUbicacion,
                    objUbicacion.codPadreUbicacion,
                    objUbicacion.codExternoUbicacion,
                    objUbicacion.nombreUbicacion,
                ]);
            }
            return {caso, objActualizado};
        })
        .then(({caso, objActualizado})=>{
            switch (caso){
                case 1:
                    res
                        .status(400)
                        .json({ respuesta: "Ya existe una ubicacion con el mismo nombre"});
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
export default ServicioUbicacionActualizar;
import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import Turno from "../model/Turno";
import { SQL_TURNO } from "../repository/sql_turno";


class ServicioTurnoActualizar {

    protected static async actualizarTurno(
        objTurno: Turno,
        res: Response
        ): Promise<any> {
        await pool
        .task(async(consulta)=> {
            let caso = 1;
            let objActualizado: any;

            const turnos = await consulta.one(SQL_TURNO.HOW_MANY, [objTurno.descripcionTurno]);
            if (turnos.cantidad == 0){
                caso = 2 ;
                objActualizado = await consulta.result(SQL_TURNO.UPDATE, [
                    objTurno.codTurno,
                    objTurno.codParqueadero,
                    objTurno.descripcionTurno,
                    objTurno.fechaTurno,
                    objTurno.horaInicioTurno,
                    objTurno.horaFinTurno,
                ]);
            }
            return {caso, objActualizado};
        })
        .then(({caso, objActualizado})=>{
            switch (caso){
                case 1:
                    res
                        .status(400)
                        .json({ respuesta: "Ya existe un turno con el mismo nombre"});
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
export default ServicioTurnoActualizar;
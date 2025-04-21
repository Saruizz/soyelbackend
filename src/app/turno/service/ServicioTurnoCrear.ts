import { Response } from "express";

import pool from "../../../config/connection/dbConnection";
import { SQL_TURNO } from "../repository/sql_turno";
import Turno from "../model/Turno";

class ServicioTurnoCrear {
    protected static async grabarTurno(obj: Turno, res: Response): Promise<any>{
        await pool
            .task(async (consulta)=> {
                let caso = 1;
                let objGrabado: any;

                const turnos = await consulta.one(SQL_TURNO.HOW_MANY, [obj.descripcionTurno]);
                if (turnos.cantidad == 0){
                    caso=2;
                    objGrabado= await consulta.one(SQL_TURNO.ADD, [obj.codParqueadero, obj.descripcionTurno, obj.fechaTurno, obj.horaInicioTurno, obj.horaFinTurno]);
                }
                return { caso, objGrabado};
            })
            .then(({caso, objGrabado})=>{
                switch (caso){
                    case 1:
                        res.status(400).json({respuesta: "Turno ya existe"});
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

export default ServicioTurnoCrear;
import { Request, Response } from "express";
import ServicioTurnoActualizar from "../service/ServicioTurnoActualizar";
import Turno from "../model/Turno";


class ControladorTurnoActualizar extends ServicioTurnoActualizar{
    public llamarActualizar(req: Request, res: Response): void{
        const objetoTurno = new Turno(0,0,"","","","");
        objetoTurno.codTurno = req.body.codTurno;
        objetoTurno.codParqueadero = req.body.codParqueadero;
        objetoTurno.descripcionTurno = req.body.descripcionTurno;
        objetoTurno.fechaTurno = req.body.fechaTurno;
        objetoTurno.horaInicioTurno = req.body.horaInicioTurno;
        objetoTurno.horaFinTurno = req.body.horaFinTurno;
        ServicioTurnoActualizar.actualizarTurno(objetoTurno, res);
    }
}
const controladorTurnoActualzar = new ControladorTurnoActualizar();
export default controladorTurnoActualzar;
import { Response, Request } from "express";
import ServicioTurnoBorrar from "../service/ServicioTurnoBorrar";
import Turno from "../model/Turno";

class ControladorTurnoBorrar extends ServicioTurnoBorrar {
    public llamarBorrar(req: Request, res: Response): void{
        const codigo = Number(req.params.codTurno);
        const objTurno = new Turno(codigo,0,"","","","");
        ServicioTurnoBorrar.borrar(objTurno, res);
    }
}
const controladorTurnoBorrar = new ControladorTurnoBorrar();
export default controladorTurnoBorrar;
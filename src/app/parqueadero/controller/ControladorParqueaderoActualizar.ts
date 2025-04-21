import { Request, Response } from "express";
import ServicioParqueaderoActualizar from "../service/ServicioParqueaderoActualizar";
import Parqueadero from "../model/Parqueadero";


class ControladorParqueaderoActualizar extends ServicioParqueaderoActualizar{
    public llamarActualizar(req: Request, res: Response): void{
        const objetoParqueadero = new Parqueadero(0,0,"","","");
        objetoParqueadero.codParqueadero = req.body.codParqueadero;
        objetoParqueadero.codUbicacion = req.body.codUbicacion;
        objetoParqueadero.nombreParqueadero = req.body.nombreParqueadero;
        objetoParqueadero.dirParqueadero = req.body.dirParqueadero;
        objetoParqueadero.telParqueadero = req.body.telParqueadero;
        ServicioParqueaderoActualizar.actualizarParqueadero(objetoParqueadero, res);
    }
}
const controladorParqueaderoActualzar = new ControladorParqueaderoActualizar();
export default controladorParqueaderoActualzar;
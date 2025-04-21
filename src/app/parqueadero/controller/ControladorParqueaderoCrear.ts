import { Request, Response } from "express";
import ServicioParqueaderoCrear from "../service/ServicioParqueaderoCrear";
import Parqueadero from "../model/Parqueadero";

class ControladorParqueaderoCrear extends ServicioParqueaderoCrear {
    public llamarGrabarParqueadero(req: Request, res: Response): void {
        console.log(req.body);
        const objTemporal = new Parqueadero(0,0,"","","");
        objTemporal.codUbicacion = req.body.codUbicacion;
        objTemporal.nombreParqueadero = req.body.nombreParqueadero;
        objTemporal.dirParqueadero = req.body.dirParqueadero;
        objTemporal.telParqueadero = req.body.telParqueadero;
        ServicioParqueaderoCrear.grabarParqueadero(objTemporal, res);
    }
}
const controladorParqueaderoCrear = new ControladorParqueaderoCrear();
export default controladorParqueaderoCrear;
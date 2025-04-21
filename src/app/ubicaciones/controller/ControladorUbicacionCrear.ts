import { Request, Response } from "express";
import ServicioUbicacionCrear from "../service/ServicioUbicacionCrear";
import Ubicacion from "../model/Ubicacion";

class ControladorUbicacionCrear extends ServicioUbicacionCrear {
    public llamarGrabarUbicacion(req: Request, res: Response): void {
        console.log(req.body);
        const objTemporal = new Ubicacion(0,0,"","");
        objTemporal.codPadreUbicacion = req.body.codPadreUbicacion;
        objTemporal.codExternoUbicacion= req.body.codExternoUbicacion;
        objTemporal.nombreUbicacion = req.body.nombreUbicacion;
        ServicioUbicacionCrear.grabarUbicacion(objTemporal, res);
    }
}
const controladorUbicacionCrear = new ControladorUbicacionCrear();
export default controladorUbicacionCrear;
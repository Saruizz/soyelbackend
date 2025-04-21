import { Request, Response } from "express";
import ServicioUbicacionActualizar from "../service/ServicioUbicacionActualizar";
import Ubicacion from "../model/Ubicacion";


class ControladorUbicacionActualizar extends ServicioUbicacionActualizar{
    public llamarActualizar(req: Request, res: Response): void{
        const objetoUbicacion = new Ubicacion(0,0,"","");
        objetoUbicacion.codUbicacion = req.body.codUbicacion;
        objetoUbicacion.codPadreUbicacion = req.body.codPadreUbicacion;
        objetoUbicacion.codExternoUbicacion = req.body.codExternoUbicacion;
        objetoUbicacion.nombreUbicacion = req.body.nombreUbicacion;
        ServicioUbicacionActualizar.actualizarUbicacion(objetoUbicacion, res);
    }
}
const controladorUbicacionActualizar = new ControladorUbicacionActualizar();
export default controladorUbicacionActualizar;
import { Response, Request } from "express";
import ServicioParqueaderoBorrar from "../service/ServicioUbicacionBorrar";
import Ubicacion from "../model/Ubicacion";
import ServicioUbicacionBorrar from "../service/ServicioUbicacionBorrar";

class ControladorUbicacionBorrar extends ServicioParqueaderoBorrar {
    public llamarBorrar(req: Request, res: Response): void{
        const codigo = Number(req.params.codUbicacion);
        const objUbicacion = new Ubicacion(codigo,0,"","");
        ServicioUbicacionBorrar.borrar(objUbicacion, res);
    }
}
const controladorUbicacionBorrar = new ControladorUbicacionBorrar();
export default controladorUbicacionBorrar;
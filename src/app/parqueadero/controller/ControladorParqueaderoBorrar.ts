import { Response, Request } from "express";
import ServicioParqueaderoBorrar from "../service/ServicioParqueaderoBorrar";
import Parqueadero from "../model/Parqueadero";

class ControladorParqueaderoBorrar extends ServicioParqueaderoBorrar {
    public llamarBorrar(req: Request, res: Response): void{
        const codigo = Number(req.params.codParqueadero);
        const objParqueadero = new Parqueadero(codigo,0,"","","");
        ServicioParqueaderoBorrar.borrar(objParqueadero, res);
    }
}
const controladorParqueaderoBorrar = new ControladorParqueaderoBorrar();
export default controladorParqueaderoBorrar;
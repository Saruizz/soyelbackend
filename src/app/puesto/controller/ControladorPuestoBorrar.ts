import { Request, Response } from "express";
import ServicioPuestoBorrar from "../service/ServicioPuestoBorrar";

class ControladorPuestoBorrar extends ServicioPuestoBorrar {
    public llamarBorrarPuesto(req: Request, res: Response): void {
        ServicioPuestoBorrar.borrarPuesto(req, res);
    }
}
const controladorPuestoBorrar = new ControladorPuestoBorrar();
export default controladorPuestoBorrar;
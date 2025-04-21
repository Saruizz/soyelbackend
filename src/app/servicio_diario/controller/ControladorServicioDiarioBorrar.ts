import { Request, Response } from "express";
import ServicioDiarioBorrar from "../service/ServicioDiarioBorrar";

class ControladorServicioDiarioBorrar extends ServicioDiarioBorrar {

    public llamarBorrarServicioDiario(req: Request, res: Response): void {
        ServicioDiarioBorrar.borrarServicioDiario(req, res);
    }
}

const controladorServicioDiarioBorrar = new ControladorServicioDiarioBorrar();
export default controladorServicioDiarioBorrar;
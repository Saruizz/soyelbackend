import { Request, Response } from "express";
import ServicioPuestoActualizar from "../service/ServicioPuestoActualizar";

class ControladorPuestoActualizar extends ServicioPuestoActualizar {
    public llamarActualizarPuesto(req: Request, res: Response): void {
        ServicioPuestoActualizar.actualizarPuesto(req, res);
    }
}
const controladorPuestoActualizar = new ControladorPuestoActualizar();
export default controladorPuestoActualizar;
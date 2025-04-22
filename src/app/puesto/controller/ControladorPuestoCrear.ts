import { Request, Response } from "express";
import ServicioPuestoCrear from "../service/ServicioPuestoCrear";

class ControladorPuestoCrear extends ServicioPuestoCrear {
    public llamarGrabarPuesto(req: Request, res: Response): void {
        ServicioPuestoCrear.grabarPuesto(req, res);
    }
}

const controladorPuestoCrear = new ControladorPuestoCrear();
export default controladorPuestoCrear;

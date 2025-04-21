import { Request, Response } from "express";
import ServicioDiarioCrear from "../service/ServicioDiarioCrear";

class ControladorServicioDiarioCrear extends ServicioDiarioCrear {
    public llamarGrabarServicioDiario(req: Request, res: Response): void {
        ServicioDiarioCrear.grabarServicioDiario(req, res);
    }
}
const controladorServicioDiarioCrear = new ControladorServicioDiarioCrear();
export default controladorServicioDiarioCrear;
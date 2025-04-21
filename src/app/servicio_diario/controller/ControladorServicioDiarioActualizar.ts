import { Request, Response } from "express";
import ServicioDiarioActualizar from "../service/ServicioDiarioActualizar";

class ControladorServicioDiarioActualizar extends ServicioDiarioActualizar {
    public llamarActualizarServicioDiario(req: Request, res: Response): void {
        ServicioDiarioActualizar.actualizarServicioDiario(req, res);
    }
}

const controladorServicioDiarioActualizar = new ControladorServicioDiarioActualizar();
export default controladorServicioDiarioActualizar;

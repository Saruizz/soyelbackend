import { Request, Response } from "express";
import ServicioTarifaDiariaActualizar from "../service/ServicioTarifaDiariaActualizar";

class ControladorTarifaDiariaActualizar extends ServicioTarifaDiariaActualizar {
    public llamarActualizarTarifaDiaria(req: Request, res: Response): void {
        ServicioTarifaDiariaActualizar.actualizarTarifaDiaria(req, res);
    }
}

const controladorTarifaDiariaActualizar = new ControladorTarifaDiariaActualizar();
export default controladorTarifaDiariaActualizar;
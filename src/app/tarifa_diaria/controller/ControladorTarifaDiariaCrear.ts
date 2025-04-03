import { Request, Response } from "express";
import ServicioTarifaDiariaCrear from "../service/ServicioTarifaDiariaCrear";

class ControladorTarifaDiariaCrear extends ServicioTarifaDiariaCrear {
    public llamarGrabarTarifaDiaria(req: Request, res: Response): void {
        ServicioTarifaDiariaCrear.grabarTarifaDiaria(req, res);
    }
}

const controladorTarifaDiariaCrear = new ControladorTarifaDiariaCrear();
export default controladorTarifaDiariaCrear;
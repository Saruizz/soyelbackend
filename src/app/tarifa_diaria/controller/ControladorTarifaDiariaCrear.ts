import { Request, Response } from "express";
import ServicioTarifaDiariaCrear from "../service/ServicioTarifaDiariaCrear";
import TarifaDiaria from "../model/TarifaDiaria";

class ControladorTarifaDiariaCrear extends ServicioTarifaDiariaCrear {
    public llamarGrabarTarifaDiaria(req: Request, res: Response): void {
        const obj = new TarifaDiaria(
            req.body.codParqueadero,
            req.body.codTipoVehiculo,
            req.body.valorTarifaDiaria
        );
        ServicioTarifaDiariaCrear.grabarTarifaDiaria(obj, res);
    }
}

const controladorTarifaDiariaCrear = new ControladorTarifaDiariaCrear();
export default controladorTarifaDiariaCrear;
import { Request, Response } from "express";
import ServicioTarifaDiariaBorrar from "../service/ServicioTarifaDiariaBorrar";

class ControladorTarifaDiariaBorrar extends ServicioTarifaDiariaBorrar {
    public llamarBorrarTarifaDiaria(req: Request, res: Response): void {
        ServicioTarifaDiariaBorrar.borrarTarifaDiaria(req, res);
    }
}

const controladorTarifaDiariaBorrar = new ControladorTarifaDiariaBorrar();
export default controladorTarifaDiariaBorrar;
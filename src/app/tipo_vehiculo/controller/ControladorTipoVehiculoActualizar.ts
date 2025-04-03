import { Request, Response } from "express";
import ServicioTipoVehiculoActualizar from "../service/ServicioTipoVehiculoActualizar";
import TipoVehiculo from "../model/TipoVehiculo";

class ControladortTipoVehiculoActualizar extends ServicioTipoVehiculoActualizar {
    public llamarActualizar(req: Request, res: Response): void {
        const objeto = new TipoVehiculo(0, "");
        objeto.codTipoVehiculo = req.body.codTipoVehiculo;
        objeto.claseTipoVehiculo = req.body.claseTipoVehiculo;
        ServicioTipoVehiculoActualizar.actualizarTipoVehiculo(objeto, res);
    }
}

const controladortTipoVehiculoActualizar = new ControladortTipoVehiculoActualizar();
export default controladortTipoVehiculoActualizar;
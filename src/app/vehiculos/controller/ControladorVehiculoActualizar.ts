import { Request, Response } from "express";
import ServicioVehiculoActualizar from "../service/ServicioVehiculoActualizar";
import Vehiculo from "../model/Vehiculo";

class ControladorVehiculoActualizar extends ServicioVehiculoActualizar {
    public llamarActualizarVehiculo(req: Request, res: Response): void {
        const objeto = new Vehiculo(0, 0, 0, "");
        objeto.codVehiculo = req.body.codVehiculo;
        objeto.codTipoVehiculo = req.body.codTipoVehiculo;
        objeto.codUsuario = req.body.codUsuario;
        objeto.placaVehiculo = req.body.placaVehiculo;
        ServicioVehiculoActualizar.actualizarVehiculo(objeto, res);
    }
}

const controladorVehiculoActualizar = new ControladorVehiculoActualizar();
export default controladorVehiculoActualizar;
import { Request, Response } from "express";
import ServicioVehiculoCrear from "../service/ServicioVehiculoCrear";
import Vehiculo from "../model/Vehiculo";

class ControladorVehiculoCrear extends ServicioVehiculoCrear {
    public llamarGrabarVehiculo(req: Request, res: Response): void {
        const objTemporal = new Vehiculo(0, 0, 0, "");
        objTemporal.codTipoVehiculo = req.body.codTipoVehiculo;
        objTemporal.codUsuario = req.body.codUsuario;
        objTemporal.placaVehiculo = req.body.placaVehiculo;
        ServicioVehiculoCrear.grabarVehiculo(objTemporal, res);
    }
}

const controladorVehiculoCrear = new ControladorVehiculoCrear();
export default controladorVehiculoCrear;
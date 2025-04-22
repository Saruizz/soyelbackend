import { Response } from "express";
import ServicioTipoVehiculoConsulta from "../service/ServicioTipoVehiculoConsulta";

class ControladorTipoVehiculoConsulta extends ServicioTipoVehiculoConsulta {
    public llamarObtenerTodos(res: Response): void {
        ServicioTipoVehiculoConsulta.obtenerTodos(res);
    }
}

const controladorTipoVehiculoConsulta = new ControladorTipoVehiculoConsulta();
export default controladorTipoVehiculoConsulta;
import { Request, Response } from "express";
import ServicioTipoVehiculoConsulta from "../service/ServicioTipoVehiculoConsulta";

class ControladorTipoVehiculoConsulta extends ServicioTipoVehiculoConsulta {
    public async llamarObtenerTodos(req: Request, res: Response): Promise<void> {
        await ServicioTipoVehiculoConsulta.obtenerTodos(res);
    }
}

const controladorTipoVehiculoConsulta = new ControladorTipoVehiculoConsulta();
export default controladorTipoVehiculoConsulta;
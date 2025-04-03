import { Request, Response } from "express";
import ServicioTarifaDiariaConsulta from "../service/ServicioTarifaDiariaConsulta";

class ControladorTarifaDiariaConsulta extends ServicioTarifaDiariaConsulta {
    public llamaroObtenerTodos(req: Request, res: Response): void {
        ServicioTarifaDiariaConsulta.obtenerTodos(res);
    }

    public llamarObtenerUno(req: Request, res: Response): void {
        ServicioTarifaDiariaConsulta.obtenerUno(req, res);
    }

    public llamarObtenerPorParqueadero(req: Request, res: Response): void {
        ServicioTarifaDiariaConsulta.obtenerPorParqueadero(req, res);
    }

    public llamarObtenerPorTipoVehiculo(req: Request, res: Response): void {
        ServicioTarifaDiariaConsulta.obtenerPorTipoVehiculo(req, res);
    }
}

const controladorTarifaDiariaConsulta = new ControladorTarifaDiariaConsulta();
export default controladorTarifaDiariaConsulta;
import ServicioVehiculoConsulta from '../service/ServicioVehiculoConsulta';
import { Request, Response } from 'express';

class ControladorVehiculoConsulta extends ServicioVehiculoConsulta {
    public llamarObtenerTodos(req: Request, res: Response): void {
        ServicioVehiculoConsulta.obtenerTodos(res);
    }

    public llamarObtenerPorCodVehiculo(req: Request, res: Response): void {
        ServicioVehiculoConsulta.obtenerPorCodVehiculo(req, res);
    }

    public llamarObtenerPorTipoVehiculo(req: Request, res: Response): void {
        ServicioVehiculoConsulta.obtenerPorTipoVehiculo(req, res);
    }
    public llamarObtenerPorUsuario(req: Request, res: Response): void {
        ServicioVehiculoConsulta.obtenerPorUsuario(req, res);
    }

    public llamarObtenerPorPlaca(req: Request, res: Response): void {
        ServicioVehiculoConsulta.obtenerPorPlaca(req, res);
    }
}

const controladorVehiculoConsulta = new ControladorVehiculoConsulta();
export default controladorVehiculoConsulta;
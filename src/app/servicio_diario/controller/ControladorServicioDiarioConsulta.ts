import { Request, Response } from "express";
import ServicioDiarioConsulta from "../service/ServicioDiarioConsulta";

class ControladorServicioDiarioConsulta extends ServicioDiarioConsulta {
    public llamaroObtenerTodos(req: Request, res: Response): void {
        ServicioDiarioConsulta.obtenerTodos(res);
    }

    public llamarObtenerUno(req: Request, res: Response): void {
        ServicioDiarioConsulta.obtenerUno(req, res);
    }

    public llamarobtenerPorServicio(req: Request, res: Response): void {
        ServicioDiarioConsulta.obtenerPorCodigoServicio(req, res);
    }
   
}

const controladorServicioDiarioConsulta = new ControladorServicioDiarioConsulta();
export default controladorServicioDiarioConsulta;
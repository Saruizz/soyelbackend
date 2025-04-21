import { Request, Response } from "express";
import ServicioPuestoConsulta from "../service/ServicioPuestoConsulta";

class ControladorPuestoConsulta extends ServicioPuestoConsulta {
    public llamarObtenerTodos(req: Request, res: Response): void {
        ServicioPuestoConsulta.obtenerTodos(res);
    }

    public llamarObtenerUno(req: Request, res: Response): void {
        ServicioPuestoConsulta.obtenerUno(req, res);
    }

}
const controladorPuestoConsulta = new ControladorPuestoConsulta();
export default controladorPuestoConsulta;
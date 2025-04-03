import ServicioRolConsulta from "../service/ServicioRolConsulta";
import { Request, Response } from "express";

class ControladorRolConsulta extends ServicioRolConsulta {
    public llamarObtenerTodos(raq: Request, res: Response): void {
        ServicioRolConsulta.obtenerTodos(res);
    }
}

const controladorRolConsulta = new ControladorRolConsulta();
export default controladorRolConsulta;
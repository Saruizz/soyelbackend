import { Request, Response } from "express";
import ServicioTurnoConsulta from "../service/ServicioTurnoConsulta";

class ControladorTurnoConsulta extends ServicioTurnoConsulta {
  public llamarObtenerTodos(req: Request, res: Response): void {
    console.log("Entró a llamarObtenerTodos");
    ServicioTurnoConsulta.obtenerTodos(res);
  }
}

const controladorTurnoConsulta = new ControladorTurnoConsulta();
export default controladorTurnoConsulta;
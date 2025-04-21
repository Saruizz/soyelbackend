import { Request, Response } from "express";
import ServicioAccesoCrear from "../service/ServicioAccesoCrear";
import Accesos from "../model/Accesos";

class ControllerAccesCreate extends ServicioAccesoCrear {
  public create(req: Request, res: Response): void {
    const objTemporal = new Accesos(
      req.body.codUsuario,
      req.body.correo,
      req.body.clave,
      req.body.uuid
    );
    ServicioAccesoCrear.crearAcceso(objTemporal, res);
  }
}
const controllerAccesCreate = new ControllerAccesCreate();
export default controllerAccesCreate;

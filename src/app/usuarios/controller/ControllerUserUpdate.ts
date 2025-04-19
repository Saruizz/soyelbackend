// Servicio ServicioUsuarioObtener.ts
import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import ServiceUserUpdate from "../service/ServiceUserUpdate";

class ControllerUserUpdate extends ServiceUserUpdate {
  public updateUser(req: Request, res: Response): void {
    const objTemporal = new Usuario(
      req.body.codUsuario,
      req.body.codRol,
      req.body.documentoUsuario,
      req.body.nombresUsuario,
      req.body.apellidosUsuario,
      req.body.generoUsuario,
      new Date(req.body.fechaNacimientoUsuario),
      req.body.telefonoUsuario
    );
    ServiceUserUpdate.updateUser(objTemporal, res);
  }
}
const controllerUserUpdate = new ControllerUserUpdate();

export default controllerUserUpdate;

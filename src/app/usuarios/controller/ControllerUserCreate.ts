import { Request, Response } from "express";
import Usuario from "../model/Usuario";
import ServicioUsuarioCrear from "../service/ServiceUserCreate";

class ControllerUserCreate extends ServicioUsuarioCrear {
  public createUser(req: Request, res: Response): void {
    const objTemporal = new Usuario(
      0,
      req.body.codRol,
      req.body.documentoUsuario,
      req.body.nombresUsuario,
      req.body.apellidosUsuario,
      req.body.generoUsuario,
      new Date(req.body.fechaNacimientoUsuario),
      req.body.telefonoUsuario
    );
    ServicioUsuarioCrear.grabarUsuario(objTemporal, res);
  }
}

const controllerUserCreate = new ControllerUserCreate();
export default controllerUserCreate;
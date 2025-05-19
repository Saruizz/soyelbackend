import { Request, Response } from "express";
import RegisterServicesCreate from "../services/registerServicesCreate";
import Accesos from "../../accesos/model/Accesos";
import Usuario from "../../usuarios/model/Usuario";

class RegisterControllerCreate extends RegisterServicesCreate {
    public createRegister = (req: Request, res: Response) => {
        const access = new Accesos(
            0,
            req.body.correo,
            req.body.clave,
            req.body.uuid
          );
          const objUser = new Usuario(
            0,
            req.body.codRol,
            req.body.documentoUsuario,
            req.body.nombresUsuario,
            req.body.apellidosUsuario,
            req.body.generoUsuario,
            new Date(req.body.fechaNacimientoUsuario),
            req.body.telefonoUsuario
          );
          const obj={
            dataUser: objUser,
            dataAccess: access
          }
        RegisterServicesCreate.createRegister(obj, res);
    }
}
const registerControllerCreate = new RegisterControllerCreate();
export default registerControllerCreate;

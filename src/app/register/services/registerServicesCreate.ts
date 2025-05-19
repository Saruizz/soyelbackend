import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sql_usuarios } from "../../usuarios/repository/sql_user";
import { sql_accesos } from "../../accesos/repository/sql_accesos";
import Usuario from "../../usuarios/model/Usuario";
import Accesos from "../../accesos/model/Accesos";

interface Register {
  dataUser: Usuario;
  dataAccess: Accesos;
}

class RegisterServicesCreate {
  protected static async createRegister(obj: Register, res: Response) {
    await pool
      .task(async (consulta) => {
        const { dataUser, dataAccess }: Register = obj;
        let caso = 1;
        let objUser: any = null;
        let objAccess: any = null;
        const usuarios = await consulta.one(sql_usuarios.HOW_MANY, [
          dataUser.documentoUsuario,
        ]);
        if (usuarios.cantidad == 0) {
          caso = 2;
          objUser = await RegisterServicesCreate.addUser(
            dataUser,
            consulta
          );
          if (objUser) {
            dataAccess.codUsuario = objUser.codUsuario;
            objAccess = await RegisterServicesCreate.addAccess(
              dataAccess,
              consulta
            );
          }
        }

        return { caso, objUser, objAccess };
      })
      .then(({ caso, objUser, objAccess }) => {
        switch (caso) {
          case 1:
            res.status(400).json({
              respuesta: "Ya se encuentra registrado ese documento de usuario",
            });
            break;
          default:
            res.status(200).json({
              respuesta: "Usuario creado correctamente",
              detalleUser: objUser,
              detalleAccess: objAccess,
            });
            break;
        }
      })
      .catch((error: any) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al crear el usuario" });
      });
  }
  private static async addUser(obj: any, consulta: any) {
    return await consulta.one(sql_usuarios.ADD, [
      obj.codRol,
      obj.documentoUsuario,
      obj.nombresUsuario,
      obj.apellidosUsuario,
      obj.generoUsuario,
      obj.fechaNacimientoUsuario,
      obj.telefonoUsuario,
    ]);
  }
  private static async addAccess(obj: any, consulta: any) {
    return await consulta.one(sql_accesos.create, [
      obj.codUsuario,
      obj.correo,
      obj.clave,
      obj.uuid,
    ]);
  }
}
export default RegisterServicesCreate;

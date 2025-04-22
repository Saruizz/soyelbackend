import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sql_usuarios } from "../repository/sql_user";
import Usuario from "../model/Usuario";

class ServicioUsuarioCrear {
  protected static async grabarUsuario(obj: Usuario, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;
        const usuarios = await consulta.one(sql_usuarios.HOW_MANY, [obj.documentoUsuario]);
        if (usuarios.cantidad == 0) {
          caso = 2;
          objGrabado = await consulta.one(sql_usuarios.ADD, [
            obj.codRol,
            obj.documentoUsuario,
            obj.nombresUsuario,
            obj.apellidosUsuario,
            obj.generoUsuario,
            obj.fechaNacimientoUsuario,
            obj.telefonoUsuario,
          ]);
        }
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 1:
            res.status(400).json({ respuesta: "Ya se encuentra registrado ese documento de usuario" });
            break;
          default:
            res.status(200).json({ objGrabado });
            break;
        }
      })
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al registrar usuario" });
      });
  }
}

export default ServicioUsuarioCrear;
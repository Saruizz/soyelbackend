// Servicio ServicioUsuarioActualizar.ts
import { Response } from "express";
import pool from "../../../config/connection/dbConnetions";
import { sql_usuarios } from "../repository/sql_user"; 
import Usuario from "../model/Usuario";

class ServiceUserUpdate {
  protected static async updateUser(
    obj: Usuario,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        const usuarios = await consulta.oneOrNone(sql_usuarios.FIND_BY_ID, [obj.codUsuario]);
        if (usuarios == null) {
          res.status(400).json({ respuesta: "No se encuentra registrado este usuario" });
        } else {
          await consulta.none(sql_usuarios.UPDATE, [
            obj.codRol,
            obj.documentoUsuario,
            obj.nombresUsuario,
            obj.apellidosUsuario,
            obj.generoUsuario,
            obj.fechaNacimientoUsuario,
            obj.telefonoUsuario,
            obj.codUsuario,
          ]);
        }
      })
      .then(() =>
        res.status(200).json({ respuesta: "Usuario actualizado correctamente" })
      )
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al actualizar usuario" });
      });
  }
}

export default ServiceUserUpdate;

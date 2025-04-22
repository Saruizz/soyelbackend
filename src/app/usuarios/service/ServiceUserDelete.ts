// Servicio ServicioUsuarioEliminar.ts
import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { sql_usuarios } from "../repository/sql_user";
import sqlIngreso from "../../ingresos/repository/sql_ingreso";
import { sql_accesos } from "../../accesos/repository/sql_accesos";

class ServiceUserDelete {
  protected static async eliminarUsuario(codUsuario: number, res: Response): Promise<any> {
    await pool
      .task(async (consulta) => {
        const usuarios = await consulta.oneOrNone(sql_usuarios.FIND_BY_ID, [codUsuario]);
        if (usuarios == null) {
          res.status(400).json({ respuesta: "No se encuentra registrado este usuario" });
        } else {
          await consulta.none(sql_usuarios.DELETE, [codUsuario]);
          const ingresos = await consulta.any(sqlIngreso.GETUSERBYID, [codUsuario]);
          for (const ingreso of ingresos) {
            await consulta.none(sqlIngreso.DELETE, [ingreso.codIngreso]);
          }
          const accesos = await consulta.any(sql_accesos.getByUserId, [codUsuario]);
          for (const acceso of accesos) {
            await consulta.none(sql_accesos.delete, [acceso.codAcceso]);
          }
        }
      })
      .then(() => res.status(200).json({ respuesta: "Usuario eliminado correctamente" }))
      .catch((miError) => {
        console.log(miError);
        res.status(400).json({ respuesta: "Error al eliminar usuario" });
      });
  }
}

export default ServiceUserDelete;
import { Response } from "express";
import Accesos from "../model/Accesos";
import pool from "../../../config/connection/dbConnection";
import { sql_accesos } from "../repository/sql_accesos";

class ServiceAccessDelete {
  protected static async deleteAccess(
    obj: Accesos,
    res: Response
  ): Promise<any> {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        const access: any = await consulta.oneOrNone(sql_accesos.getById, [
          obj.codUsuario,
        ]);
        if (access == null) {
          caso = 2;
        } else {
          await consulta.none(sql_accesos.delete, [obj.codUsuario]);
          caso = 1;
        }
        return { caso, obj };
      })
      .then(({ caso, obj }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "El acceso no existe en la base de datos" });
            break;
          default:
            res.status(200).json({
              respuesta: "Acceso eliminado correctamente",
              detalle: obj,
            });
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al eliminar el acceso",
          detalle: error.message,
        });
      });
  }
}

export default ServiceAccessDelete;

import pool from "../../../config/connection/dbConnection";
import Accesos from "../model/Accesos";
import { Response } from "express";
import { sql_accesos } from "../repository/sql_accesos";
import cifrar from "bcryptjs";

class ServicioAccesoCrear {
  protected static async crearAcceso(obj: Accesos, res: Response) {
    await pool
      .task(async (consulta) => {
        let caso = 1;
        let objGrabado: any;
        const usuarioExiste = await consulta.oneOrNone(
          sql_accesos.getByUserId,
          [obj.codUsuario]
        );
        if (!usuarioExiste) {
          caso = 3;
        } else {
          const access: any = await consulta.oneOrNone(sql_accesos.getById, [
            obj.codUsuario,
          ]);
          if (!access) {
            caso = 2;
          }
          const saltRounds = 10;
          const hashedPassword = cifrar.hashSync(obj.clave, saltRounds);
          // Guardar hashedPassword en la BD;
          objGrabado = await consulta.one(sql_accesos.create, [
            obj.codUsuario,
            obj.correo,
            hashedPassword,
            obj.uuid,
          ]);
        }
        return { caso, objGrabado };
      })
      .then(({ caso, objGrabado }) => {
        switch (caso) {
          case 2:
            res
              .status(400)
              .json({ respuesta: "Ya se encuentra registrado ese usuario" });
            break;
          case 3:
            res
              .status(400)
              .json({ respuesta: "El usuario no existe en la base de datos" });
            break;
          default:
            res.status(200).json({
              respuesta: "Acceso creado con exito",
              detalle: objGrabado,
            });
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({ respuesta: "Error al crear el acceso" });
      });
  }
}

export default ServicioAccesoCrear;

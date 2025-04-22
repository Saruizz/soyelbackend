import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import sql_service_other from "../repository/sql_service_other";

class ServiceGetServiceOther {
  protected static async getAll(res: Response) {
    await pool
      .task(async (consulta: any) => {
        let caso = 1;
        const servicios = await consulta.query(sql_service_other.FIND_ALL);
        if (servicios.length === 0) {
          caso = 2;
        }
        return { servicios, caso };
      })
      .then(({ servicios, caso }) => {
        switch (caso) {
          case 1:
            res.status(200).json({
              respuesta: "Servicios obtenidos correctamente",
              detalle: servicios,
            });
            break;
          case 2:
            res.status(200).json({
              respuesta: "No se encontraron servicios",
              detalle: servicios,
            });
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al obtener los servicios",
          detalle: error.message,
        });
      });
  }
  protected static async getById(id:number,res: Response) {
    await pool
      .task(async (consulta: any) => {
        let caso = 1;
        const servicios = await consulta.query(sql_service_other.FIND_BY_ID, [id]);
        if (servicios.length === 0) {
          caso = 2;
        }
        return { servicios, caso };
      })
      .then(({ servicios, caso }) => {
        switch (caso) {
          case 1:
            res.status(200).json({
              respuesta: "Servicio obtenido correctamente",
              detalle: servicios,
            });
            break;
          case 2:
            res.status(200).json({
              respuesta: "No se encontró el servicio",
              detalle: servicios,
            });
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).json({
          respuesta: "Error al obtener el servicio",
          detalle: error.message,
        });
      });
  }
}
export default ServiceGetServiceOther;

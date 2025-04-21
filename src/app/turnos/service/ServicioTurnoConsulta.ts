import { Response } from "express";
import  pool  from "../../../config/connection/dbConnection";
import { SQL_TURNO } from "../repository/sql_turno";

class ServicioTurnoConsulta {
  protected static async obtenerTodos(res: Response): Promise<any> {
    console.log("Ejecutando consulta SQL:", SQL_TURNO.FIND_ALL);
    await pool
      .any(SQL_TURNO.FIND_ALL)  
      .then((misDatos) => {
        console.log("Datos obtenidos:", misDatos);
        res.status(200).json(misDatos);
      })
      .catch((miError) => {
        console.log("Error en la consulta:", miError);
        res.status(400).json({ respuesta: "Se totió el SQL mano" });
      });
}
}

export default ServicioTurnoConsulta;
import pool from "../../../config/connection/dbConnection";
import { SQL_TURNO } from "../repository/sql_turno";
import { Response } from "express";
import Turno from "../model/Turno";

class ServicioTurnoCrear {
  
  static async grabarTurno(obj: Turno, res: Response): Promise<any> {
    try {
      console.log("📩 Datos recibidos para grabar:", obj);
      console.log("📆 Fecha Turno:", obj.fecha_Turno);
      console.log("⏰ Hora Inicio:", obj.hora_Inicio_Turno);
      console.log("⏰ Hora Fin:", obj.hora_Fin_Turno);

      const resultado = await pool.task(async (consulta) => {
        let caso = 1;
        let objGrabado = null;

        console.log("🔍 Verificando existencia de turno con:");
        console.log("   📆 Fecha:", obj.fecha_Turno);
        console.log("   ⏰ Hora Inicio:", obj.hora_Inicio_Turno);
        console.log("   ⏰ Hora Fin:", obj.hora_Fin_Turno);

        const turnos = await consulta.oneOrNone(SQL_TURNO.HOW_MANY, [
          obj.fecha_Turno,
          obj.hora_Inicio_Turno,
          obj.hora_Fin_Turno,
        ]);

        console.log("📊 Resultado de consulta turnos:", turnos);

        if (!turnos || turnos.cantidad == 0) {
          console.log("✅ No hay turnos existentes, creando nuevo turno con:");
          console.log("   🏢 Parqueadero:", obj.cod_Parqueadero);
          console.log("   📜 Descripción:", obj.descripcion_Turno);
          console.log("   📆 Fecha:", obj.fecha_Turno);
          console.log("   ⏰ Hora Inicio:", obj.hora_Inicio_Turno);
          console.log("   ⏰ Hora Fin:", obj.hora_Fin_Turno);

          caso = 2;
          objGrabado = await consulta.one(SQL_TURNO.ADD, [
            obj.cod_Parqueadero,
            obj.descripcion_Turno,
            obj.fecha_Turno,
            obj.hora_Inicio_Turno,
            obj.hora_Fin_Turno,
          ]);

          console.log("🔍 Objeto grabado en BD:", objGrabado);
        }

        return { caso, objGrabado };
      });

      console.log("🎯 Resultado final antes de enviar respuesta:", resultado);

      if (!resultado) {
        console.error("⛔ ERROR: El resultado es undefined");
        return res.status(500).json({ respuesta: "Error interno en la creación del turno" });
      }

      if (resultado.caso === 1) {
        return res.status(400).json({ respuesta: "El turno ya existe" });
      } else {
        return res.status(200).json(resultado.objGrabado);
      }
    } catch (miError) {
      console.error("⛔ ERROR SQL:", miError);
      return res.status(500).json({ respuesta: "Error en la consulta SQL" });
    }
  }
}

export default ServicioTurnoCrear;
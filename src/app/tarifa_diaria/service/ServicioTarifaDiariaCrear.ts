import { Request, Response } from "express";
import pool from "../../../config/connection/dbConnection";
import { SQL_TARIFA_DIARIA } from "../repository/sql_tarifa_diaria";
import TarifaDiaria from "../model/TarifaDiaria";

class ServicioTarifaDiariaCrear {
  protected static async grabarTarifaDiaria(
    obj: TarifaDiaria,
    res: Response
  ): Promise<any> {
    const { codParqueadero, codTipoVehiculo, valorTarifaDiaria } = obj;

    try {
      const existeTarifa = await pool.oneOrNone(SQL_TARIFA_DIARIA.HOW_MANY, [
        codParqueadero,
        codTipoVehiculo,
      ]);

      // ✅ Manejo correcto de null/undefined
      if (existeTarifa && existeTarifa.cantidad !== "0") {
        return res.status(400).json({
          respuesta:
            "Ya existe una tarifa diaria para este parqueadero y tipo de vehículo",
        });
      }

      // Si existeTarifa es null/undefined o cantidad es "0", continuar con la creación
      const nuevaTarifa = await pool.one(SQL_TARIFA_DIARIA.ADD, [
        codParqueadero,
        codTipoVehiculo,
        valorTarifaDiaria,
      ]);

      res.status(201).json({
        respuesta: "Tarifa diaria creada correctamente",
        nuevaTarifa: nuevaTarifa,
      });
    } catch (error: any) {
      console.log(error);

      if (error.code === "23503") {
        return res.status(400).json({
          respuesta:
            "Error al crear la tarifa. Verifique que el parqueadero y el tipo de vehículo existan.",
          detalleError: error.detail,
        });
      }

      return res.status(500).json({
        respuesta: "Error interno al crear la tarifa diaria",
        error: error.message,
      });
    }
  }
}

export default ServicioTarifaDiariaCrear;

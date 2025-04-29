import { Request, Response } from "express";
import ServicioTurnoActualizar from "../service/ServicioTurnoActualizar";

class ControladorTurnoActualizar {
  public async llamarActualizar(req: Request, res: Response): Promise<void> {
    const codTurno = Number(req.params.codturno); 

    if (isNaN(codTurno) || codTurno <= 0) {
      res.status(400).json({ respuesta: "Código de turno inválido" });
      return;
    }

    const { cod_turno, cod_Parqueadero, descripcion_turno, fecha_turno, hora_inicio_turno, hora_fin_turno } = req.body;
    if (!cod_Parqueadero || !descripcion_turno || !fecha_turno || !hora_inicio_turno || !hora_fin_turno) {
      res.status(400).json({ respuesta: "Faltan datos obligatorios en el cuerpo de la solicitud" });
      return Promise.resolve();
    }
    const datosTurno = {
      codTurno: cod_turno,
      codParqueadero: cod_Parqueadero,
      descripcionTurno: descripcion_turno,
      fechaTurno: fecha_turno,
      horaInicioTurno: hora_inicio_turno,
      horaFinTurno: hora_fin_turno
  };

    try {
      await ServicioTurnoActualizar.actualizarTurno(datosTurno, res);

    } catch (error) {
      console.error("Error en la actualización:", error);
      res.status(500).json({ respuesta: "Error interno del servidor" });
    }
  }
}

export default new ControladorTurnoActualizar();

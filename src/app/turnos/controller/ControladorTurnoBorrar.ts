import ServicioTurnoBorrar from "../service/ServicioTurnoBorrar";
import { Request, Response } from "express";

class ControladorTurnoBorrar {
  public async llamarBorrar(req: Request, res: Response): Promise<void> {
    const codigo = Number(req.params.codturno); 
    if (isNaN(codigo) || codigo <= 0) {
      res.status(400).json({ respuesta: "Código de turno inválido" });
      return;
    }

    await ServicioTurnoBorrar.borrar(codigo, res); // Enviar solo el código al servicio
  }
}

const controladorTurnoBorrar = new ControladorTurnoBorrar();
export default controladorTurnoBorrar;
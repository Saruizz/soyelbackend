import { Router } from "express";
import controladorTurnoConsulta from "../controller/ControladorTurnoConsulta";
import controladorTurnoCrear from "../controller/ControladorTurnoCrear";
import { datosTurnoActualizar, datosTurnoCrear } from "../../../config/domain/ValidarTurno";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorTurnoBorrar from "../controller/ControladorTurnoBorrar";
import ControladorTurnoActualizar from "../controller/ControladorTurnoActualizar";

class RutaTurno {
  public rutaTurnoApi: Router;

  constructor() {
    this.rutaTurnoApi = Router();
    
    this.rutaTurnoApi.get("/getall", controladorTurnoConsulta.llamarObtenerTodos);
    this.rutaTurnoApi.post("/add", datosTurnoCrear, validarDatos.ahora, controladorTurnoCrear.llamarGrabarTurno);
    this.rutaTurnoApi.delete("/delete/:codturno", validarDatos.ahora, controladorTurnoBorrar.llamarBorrar);
    this.rutaTurnoApi.put("/update/:codturno", datosTurnoActualizar, validarDatos.ahora, ControladorTurnoActualizar.llamarActualizar);
  }
}

const rutaTurno = new RutaTurno();
export default rutaTurno.rutaTurnoApi;
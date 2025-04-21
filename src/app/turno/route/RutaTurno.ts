import { Router} from "express";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorTurnoConsulta from "../controller/ControladorTurnoConsulta";
import { datosTurnoCrear, datosTurnoActualizar, datosTurnoBorrar } from "../../../config/domain/ValidarTuno";
import controladorTurnoCrear from "../controller/ControladorTurnoCrear";
import controladorTurnoBorrar from "../controller/ControladorTurnoBorrar";
import controladorTurnoActualzar from "../controller/ControladorTurnoActualizar";

class RutaTurno {
    public rutaTurnoApi: Router;

    constructor(){
        this.rutaTurnoApi = Router();
        this.rutaTurnoApi.get("/getall", controladorTurnoConsulta.llamarObtenerTodos);
        this.rutaTurnoApi.post("/add", datosTurnoCrear,validarDatos.ahora, controladorTurnoCrear.llamarGrabarTurno);
        this.rutaTurnoApi.delete("/delete/:codTurno",datosTurnoBorrar,validarDatos.ahora,controladorTurnoBorrar.llamarBorrar);
        this.rutaTurnoApi.put("/update",controladorTurnoActualzar.llamarActualizar);
    }

}
const rutaTurno = new RutaTurno();
export default rutaTurno.rutaTurnoApi;
import { Router} from "express";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorParqueaderoConsulta from "../controller/ControladorParqueaderoConsulta";
import { datosParqueaderoBorrar, datosParqueaderoCrear } from "../../../config/domain/ValidarParqueadero";
import controladorParqueaderoCrear from "../controller/ControladorParqueaderoCrear";
import controladorParqueaderoBorrar from "../controller/ControladorParqueaderoBorrar";
import controladorParqueaderoActualzar from "../controller/ControladorParqueaderoActualizar";

class RutaParqueadero {
    public rutaParqueaderoApi: Router;

    constructor(){
        this.rutaParqueaderoApi = Router();
        this.rutaParqueaderoApi.get("/getall", controladorParqueaderoConsulta.llamarObtenerTodos);
        this.rutaParqueaderoApi.post("/add", datosParqueaderoCrear,validarDatos.ahora, controladorParqueaderoCrear.llamarGrabarParqueadero);
        this.rutaParqueaderoApi.delete("/delete/:codParqueadero",datosParqueaderoBorrar,validarDatos.ahora,controladorParqueaderoBorrar.llamarBorrar);
        this.rutaParqueaderoApi.put("/update",controladorParqueaderoActualzar.llamarActualizar);
    }

}
const rutaParqueadero = new RutaParqueadero();
export default rutaParqueadero.rutaParqueaderoApi;
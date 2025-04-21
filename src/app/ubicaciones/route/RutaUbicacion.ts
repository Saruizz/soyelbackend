import { Router} from "express";
import validarDatos from "../../../middleware/ValidarDatos";
import controladorTurnoActualzar from "../../turno/controller/ControladorTurnoActualizar";
import { datosParqueaderoBorrar, datosParqueaderoCrear } from "../../../config/domain/ValidarParqueadero";
import controladorParqueaderoBorrar from "../controller/ControladorUbicacionBorrar";
import controladorUbicacionConsulta from "../controller/ControladorUbicacionConsulta";
import controladorUbicacionCrear from "../controller/ControladorUbicacionCrear";
import { datosUbicacionBorrar, datosUbicacionCrear } from "../../../config/domain/ValidarUbicacion";
import controladorUbicacionBorrar from "../controller/ControladorUbicacionBorrar";
import controladorUbicacionActualizar from "../controller/ControladorUbicacionActualizar";

class RutaUbicacion {
    public rutaUbicacionApi: Router;

    constructor(){
        this.rutaUbicacionApi = Router();
        this.rutaUbicacionApi.get("/getall", controladorUbicacionConsulta.llamarObtenerTodos);
        this.rutaUbicacionApi.post("/add", datosUbicacionCrear,validarDatos.ahora, controladorUbicacionCrear.llamarGrabarUbicacion);
        this.rutaUbicacionApi.delete("/delete/:codUbicacion",datosUbicacionBorrar,validarDatos.ahora,controladorUbicacionBorrar.llamarBorrar);
        this.rutaUbicacionApi.put("/update",controladorUbicacionActualizar.llamarActualizar);
    }

}
const rutaUbicacion = new RutaUbicacion();
export default rutaUbicacion.rutaUbicacionApi;
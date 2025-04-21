import { Router } from "express";
import controladorPuestoConsulta from "../controller/ControladorPuestoConsulta";
import controladorPuestoCrear from "../controller/ControladorPuestoCrear";
import controladorPuestoBorrar from "../controller/ControladorPuestoBorrar";
import controladorPuestoActualizar from "../controller/ControladorPuestoActualizar";
import {
    datosPuestoCrear,
    datosPuestoActualizar,
    datosPuestoVerParam,
} from "../../../config/domain/ValidarPuesto";
import validarDatos from "../../../middleware/ValidarDatos";    

class RutaPuesto {
    public rutaPuestoApi: Router;

    constructor() {
        this.rutaPuestoApi = Router();
        this.configurarRutasConsulta();
        this.configurarRutasGestion();
    }

    private configurarRutasConsulta(): void {
        // Obtener todos los puestos
        this.rutaPuestoApi.get(
            "/getall",
            controladorPuestoConsulta.llamarObtenerTodos
        );

        // Obtener puesto por ID
        this.rutaPuestoApi.get(
            "/getone/:codPuesto",
            datosPuestoVerParam,
            validarDatos.ahora,
            controladorPuestoConsulta.llamarObtenerUno
        );
        
    
    }
        private configurarRutasGestion(): void {
        // Crear nuevo puesto
        this.rutaPuestoApi.post(
            "/add",
            datosPuestoCrear,
            validarDatos.ahora,
            controladorPuestoCrear.llamarGrabarPuesto
        );
        // Borrar puesto
        this.rutaPuestoApi.delete(
            "/delete/:codPuesto",
            datosPuestoVerParam,
            validarDatos.ahora,
            controladorPuestoBorrar.llamarBorrarPuesto
        );
        // Actualizar puesto
        this.rutaPuestoApi.put(
            "/update/:codPuesto",
            datosPuestoVerParam,
            datosPuestoActualizar,
            validarDatos.ahora,
            controladorPuestoActualizar.llamarActualizarPuesto
        );        
   
    }
}
const rutaPuesto = new RutaPuesto();
export default new RutaPuesto().rutaPuestoApi;
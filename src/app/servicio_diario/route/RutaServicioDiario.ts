import { Router } from "express";
import controladorServicioDiarioConsulta from "../controller/ControladorServicioDiarioConsulta";
import controladorServicioDiarioCrear from "../controller/ControladorServicioDiarioCrear";
import controladorServicioDiarioBorrar from "../controller/ControladorServicioDiarioBorrar";
import controladorServicioDiarioActualizar from "../controller/ControladorServicioDiarioActualizar";
import {
    datosServicioDiarioCrear,
    datosServicioDiarioActualizar,
    datosServicioDiarioVerParamServicioDiario
} from "../../../config/domain/ValidarServicioDiario";

import validarDatos from "../../../middleware/ValidarDatos";

class RutaServicioDiario {
    public rutaServicioDiarioApi: Router;

    constructor() {
        this.rutaServicioDiarioApi = Router();
        this.configurarRutasConsulta();
        this.configurarRutasGestion();
    }

    private configurarRutasConsulta(): void {
        // Obtener todos los servicios diarios
        this.rutaServicioDiarioApi.get(
            "/getall",
            controladorServicioDiarioConsulta.llamaroObtenerTodos
        );

        // Obtener servicio diario por ID
        this.rutaServicioDiarioApi.get(
            "/getone/:codServicioDiario",
            datosServicioDiarioVerParamServicioDiario,
            validarDatos.ahora,
            controladorServicioDiarioConsulta.llamarObtenerUno
        );
    }  

    private configurarRutasGestion(): void {
        // Crear nuevo servicio diario
        this.rutaServicioDiarioApi.post(
            "/add",
            datosServicioDiarioCrear,
            validarDatos.ahora,
            controladorServicioDiarioCrear.llamarGrabarServicioDiario
        );

        // Actualizar servicio diario
        this.rutaServicioDiarioApi.put(
            "/update/:codServicioDiario",
            datosServicioDiarioVerParamServicioDiario,
            datosServicioDiarioActualizar,
            validarDatos.ahora,
            controladorServicioDiarioActualizar.llamarActualizarServicioDiario
        );

        // Borrar servicio diario
        this.rutaServicioDiarioApi.delete(
            "/delete/:codServicioDiario",
            datosServicioDiarioVerParamServicioDiario,
            validarDatos.ahora,
            controladorServicioDiarioBorrar.llamarBorrarServicioDiario
        );
    }

} 
const rutaServicioDiario = new RutaServicioDiario();
export default rutaServicioDiario.rutaServicioDiarioApi;
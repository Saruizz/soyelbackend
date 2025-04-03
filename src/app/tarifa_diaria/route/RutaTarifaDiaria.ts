import { Router } from "express";
import controladorTarifaDiariaConsulta from "../controller/ControladorTarifaDiariaConsulta";
import controladorTarifaDiariaCrear from "../controller/ControladorTarifaDiariaCrear";
import controladorTarifaDiariaBorrar from "../controller/ControladorTarifaDiariaBorrar";
import controladorTarifaDiariaActualizar from "../controller/ControladorTarifaDiariaActualizar";
import {
    datosTarifaDiariaCrear,
    datosTarifaDiariaActualizar,
    datosTarifaDiariaVerParamTipoVehiculo,
    datosTarifaDiariaVerParamParqueadero
} from "../../../config/domain/ValidarTarifaDiaria";
import validarDatos from "../../../middleware/ValidarDatos";

class RutaTarifaDiaria {
    public rutaTarifaDiariaApi: Router;

    constructor() {
        this.rutaTarifaDiariaApi = Router();
        this.configurarRutasConsulta();
        this.configurarRutasGestion();
    }

    private configurarRutasConsulta(): void {
        // Obtener todas las tarifas
        this.rutaTarifaDiariaApi.get(
            "/getall",
            controladorTarifaDiariaConsulta.llamaroObtenerTodos
        );

        // Obtener tarifa por IDs
        this.rutaTarifaDiariaApi.get(
            "/getone/:codParqueadero/:codTipoVehiculo",
            datosTarifaDiariaVerParamParqueadero,
            datosTarifaDiariaVerParamTipoVehiculo,
            validarDatos.ahora,
            controladorTarifaDiariaConsulta.llamarObtenerUno
        );

        // Obtener tarifas por parqueadero
        this.rutaTarifaDiariaApi.get(
            "/getbyparqueadero/:codParqueadero",
            datosTarifaDiariaVerParamParqueadero,
            validarDatos.ahora,
            controladorTarifaDiariaConsulta.llamarObtenerPorParqueadero
        );

        // Obtener tarifas por tipo de vehículo
        this.rutaTarifaDiariaApi.get(
            "/getbytipovehiculo/:codTipoVehiculo",
            datosTarifaDiariaVerParamTipoVehiculo,
            validarDatos.ahora,
            controladorTarifaDiariaConsulta.llamarObtenerPorTipoVehiculo
        );
    }

    private configurarRutasGestion(): void {
        // Crear nueva tarifa
        this.rutaTarifaDiariaApi.post(
            "/add",
            datosTarifaDiariaCrear,
            validarDatos.ahora,
            controladorTarifaDiariaCrear.llamarGrabarTarifaDiaria
        );

        // Eliminar tarifa
        this.rutaTarifaDiariaApi.delete(
            "/delete/:codParqueadero/:codTipoVehiculo",
            datosTarifaDiariaVerParamParqueadero,
            datosTarifaDiariaVerParamTipoVehiculo,
            validarDatos.ahora,
            controladorTarifaDiariaBorrar.llamarBorrarTarifaDiaria
        );

        // Actualizar tarifa
        this.rutaTarifaDiariaApi.put(
            "/update",
            datosTarifaDiariaActualizar,
            validarDatos.ahora,
            controladorTarifaDiariaActualizar.llamarActualizarTarifaDiaria
        );
    }
}

const rutaTarifaDiaria = new RutaTarifaDiaria();
export default rutaTarifaDiaria.rutaTarifaDiariaApi;
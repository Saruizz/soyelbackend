import { Router } from "express";
import controladorVehiculoConsulta from "../controller/ControladorVehiculoConsulta";
import controladorVehiculoCrear from "../controller/ControladorVehiculoCrear";
import controladorVehiculoActualizar from "../controller/ControladorVehiculoActualizar";
import controladorVehiculoBorrar from "../controller/ControladorVehiculoBorrar";
import validarDatos from "../../../middleware/ValidarDatos";

class RutaVehiculo {
    public rutaVehiculoApi: Router;

    constructor() {
        this.rutaVehiculoApi = Router();
        this.configurararRutasConsulta();
        this.configurararRutasGestion();
    }

    private configurararRutasConsulta(): void {
        this.rutaVehiculoApi.get(
            "/getall",
            controladorVehiculoConsulta.llamarObtenerTodos
        );
        this.rutaVehiculoApi.get(
            "/getone/:codVehiculo",
            validarDatos.ahora,
            controladorVehiculoConsulta.llamarObtenerPorCodVehiculo
        );
        this.rutaVehiculoApi.get(
            "/getbytipovehiculo/:codTipoVehiculo",
            validarDatos.ahora,
            controladorVehiculoConsulta.llamarObtenerPorTipoVehiculo
        );
        this.rutaVehiculoApi.get(
            "/getbyusuario/:codUsuario",
            validarDatos.ahora,
            controladorVehiculoConsulta.llamarObtenerPorUsuario
        );
        this.rutaVehiculoApi.get(
            "/getbyplaca/:placaVehiculo",
            validarDatos.ahora,
            controladorVehiculoConsulta.llamarObtenerPorPlaca
        );
    }

    private configurararRutasGestion(): void {
        this.rutaVehiculoApi.post(
            "/add",
            validarDatos.ahora,
            controladorVehiculoCrear.llamarGrabarVehiculo
        );
        this.rutaVehiculoApi.put(
            "/update",
            validarDatos.ahora,
            controladorVehiculoActualizar.llamarActualizarVehiculo
        );
        this.rutaVehiculoApi.delete(
            "/delete/:codVehiculo",
            validarDatos.ahora,
            controladorVehiculoBorrar.llamarBorrarVehiculo
        );
    }
}

const rutaVehiculo = new RutaVehiculo();
export default rutaVehiculo.rutaVehiculoApi;
import { Router } from "express";
import controladorLogin from "../controller/ControladorLogin";
import {
    datosLogin,
    datosValidarSesion,
    datosCerrarSesion,
    datosHistorialIngresos
} from "../../../config/domain/ValidarLogin";
import validarDatos from "../../../middleware/ValidarDatos";

class RutaLogin {
    public rutaLoginApi: Router;

    constructor() {
        this.rutaLoginApi = Router();
        this.configurarRutas();
    }

    private configurarRutas(): void {
        // Ruta para iniciar sesión
        this.rutaLoginApi.post(
            "/iniciar",
            validarDatos.ahora,
            controladorLogin.llamarIniciarSesion
        );

        // Ruta para validar sesión
        this.rutaLoginApi.post(
            "/validar",
            datosValidarSesion,
            validarDatos.ahora,
            controladorLogin.llamarValidarSesion
        );

        // Ruta para cerrar sesión
        this.rutaLoginApi.post(
            "/cerrar",
            datosCerrarSesion,
            validarDatos.ahora,
            controladorLogin.llamarCerrarSesion
        );

        // Ruta para obtener historial de ingresos
        this.rutaLoginApi.get(
            "/historial/:codUsuario",
            datosHistorialIngresos,
            validarDatos.ahora,
            controladorLogin.llamarObtenerHistorialIngresos
        );
    }
}

const rutaLogin = new RutaLogin();
export default rutaLogin.rutaLoginApi;
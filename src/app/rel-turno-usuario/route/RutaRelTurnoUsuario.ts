import { Router } from "express";
import ControladorRelTurnoUsuario from "../controller/ControladorRelTurnoUsuario";
import { datosRelTurnoUsuario } from "../../../config/domain/ValidarRelTurnoUsuario";
import validarDatos from "../../../middleware/ValidarDatos";

class RutaRelTurnoUsuario {
    public rutaApi: Router;

    constructor() {
        this.rutaApi = Router();
        this.configurarRutas();
    }

    private configurarRutas(): void {
        this.rutaApi.post("/add", datosRelTurnoUsuario, validarDatos.ahora, ControladorRelTurnoUsuario.crearRelacion);
        this.rutaApi.delete("/delete/:codTurnoUsuario",validarDatos.ahora, ControladorRelTurnoUsuario.eliminarRelacion);
        this.rutaApi.get("/getall", ControladorRelTurnoUsuario.obtenerTodasLasRelaciones);
        this.rutaApi.put("/update/:codTurnoUsuario",validarDatos.ahora, ControladorRelTurnoUsuario.actualizarRelacion);
    }
}

export default new RutaRelTurnoUsuario().rutaApi;

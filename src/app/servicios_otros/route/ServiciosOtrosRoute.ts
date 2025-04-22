import { Router } from "express";
import validarDatos from "../../../middleware/ValidarDatos";
import {
    datosServicioCrear,
    datosServicioActualizar,
    datosIngresoCrear,
    datosIngresoActualizar,
    datosFiltroFecha
} from "../../../config/domain/ValidarServiciosOtros";

class ServiciosOtrosRoute {
    public router: Router;

    constructor() {
        this.router = Router();
    }
}

const serviciosOtrosRoute = new ServiciosOtrosRoute();
export default serviciosOtrosRoute.router;
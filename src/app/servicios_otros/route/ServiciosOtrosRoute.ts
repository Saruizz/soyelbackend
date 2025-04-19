v import { Router } from "express";
import controladorServiciosOtros from "../controller/ControladorServiciosOtros";
import controladorIngresosServiciosOtros from "../controller/ControladorIngresosServiciosOtros";
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
        this.configurarRutas();
    }

    private configurarRutas(): void {
        // Rutas para Servicios Otros
        this.router.post('/servicios', datosServicioCrear, validarDatos.ahora, controladorServiciosOtros.crearServicio);
        this.router.get('/servicios/fecha', datosFiltroFecha, validarDatos.ahora, controladorServiciosOtros.obtenerServiciosPorFecha);
        this.router.get('/servicios', controladorServiciosOtros.obtenerServicios);
        this.router.get('/servicios/:id([0-9]+)', controladorServiciosOtros.obtenerServicioPorId);
        this.router.put('/servicios/:id([0-9]+)', datosServicioActualizar, validarDatos.ahora, controladorServiciosOtros.actualizarServicio);
        this.router.delete('/servicios/:id([0-9]+)', controladorServiciosOtros.eliminarServicio);

        // Rutas para Ingresos de Servicios Otros
        this.router.post('/ingresos', datosIngresoCrear, validarDatos.ahora, controladorIngresosServiciosOtros.registrarIngreso);
        this.router.get('/ingresos/fecha', datosFiltroFecha, validarDatos.ahora, controladorIngresosServiciosOtros.obtenerIngresosPorFecha);
        this.router.get('/ingresos', controladorIngresosServiciosOtros.obtenerIngresos);
        this.router.get('/ingresos/:id([0-9]+)', controladorIngresosServiciosOtros.obtenerIngresoPorId);
        this.router.put('/ingresos/:id([0-9]+)', datosIngresoActualizar, validarDatos.ahora, controladorIngresosServiciosOtros.actualizarIngreso);
        this.router.delete('/ingresos/:id([0-9]+)', controladorIngresosServiciosOtros.anularIngreso);
    }
}

const serviciosOtrosRoute = new ServiciosOtrosRoute();
export default serviciosOtrosRoute.router;
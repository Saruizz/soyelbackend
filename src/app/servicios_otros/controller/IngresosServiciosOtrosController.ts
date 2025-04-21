import { Request, Response } from 'express';
import IngresosServiciosOtros from '../model/IngresosServiciosOtros';
import IngresosServiciosOtrosService from '../service/IngresosServiciosOtrosService';
import ServiciosOtrosService from '../service/ServiciosOtrosService';
import DateUtils from '../utils/DateUtils';

class IngresosServiciosOtrosController {
    private servicioIngresos: IngresosServiciosOtrosService;
    private servicioOtros: ServiciosOtrosService;

    constructor() {
        this.servicioIngresos = IngresosServiciosOtrosService.getInstance();
        this.servicioOtros = ServiciosOtrosService.getInstance();
    }

    private async handleError(error: unknown, res: Response, mensaje: string): Promise<void> {
        console.error(`Error en IngresosServiciosOtrosController: ${mensaje}`, error);
        res.status(500).json({
            success: false,
            mensaje,
            error: error instanceof Error ? error.message : 'Error desconocido',
            timestamp: new Date().toISOString()
        });
    }

    public async llamarGrabar(req: Request, res: Response): Promise<void> {
        try {
            const { cod_servicio, cantidad, observaciones } = req.body;
            
            if (!cod_servicio || !cantidad) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Código de servicio y cantidad son requeridos',
                    timestamp: new Date().toISOString()
                });
                return;
            }

            const servicio = await this.servicioOtros.obtenerServicioPorId(cod_servicio, res);
            if (!servicio) return;

            const ingreso = new IngresosServiciosOtros(
                0,
                servicio,
                new Date(),
                cantidad,
                servicio.getPrecio() * cantidad,
                observaciones || '',
                true
            );

            await this.servicioIngresos.registrarIngreso(ingreso, res);
        } catch (error) {
            await this.handleError(error, res, 'Error al registrar el ingreso');
        }
    }

    public async llamarObtenerTodos(req: Request, res: Response): Promise<void> {
        try {
            await this.servicioIngresos.obtenerIngresos(res);
        } catch (error) {
            await this.handleError(error, res, 'Error al obtener los ingresos');
        }
    }

    public async llamarObtenerUno(req: Request, res: Response): Promise<void> {
        try {
            const codIngreso = parseInt(req.params.id);
            if (isNaN(codIngreso)) {
                res.status(400).json({
                    success: false,
                    mensaje: 'ID de ingreso inválido',
                    timestamp: new Date().toISOString()
                });
                return;
            }
            await this.servicioIngresos.obtenerIngresoPorId(codIngreso, res);
        } catch (error) {
            await this.handleError(error, res, 'Error al obtener el ingreso');
        }
    }

    public async llamarObtenerPorFecha(req: Request, res: Response): Promise<void> {
        try {
            const { fecha_inicio, fecha_fin } = req.query;
            
            if (!fecha_inicio || !fecha_fin) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Se requieren ambas fechas',
                    timestamp: new Date().toISOString()
                });
                return;
            }
            
            const fechaInicio = new Date(fecha_inicio as string);
            const fechaFin = new Date(fecha_fin as string);
            
            if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
                res.status(400).json({
                    success: false,
                    mensaje: 'Formato de fecha inválido',
                    timestamp: new Date().toISOString()
                });
                return;
            }

            await this.servicioIngresos.obtenerIngresosPorFecha(fechaInicio, fechaFin, res);
        } catch (error) {
            await this.handleError(error, res, 'Error al obtener los ingresos por fecha');
        }
    }

    public async llamarActualizar(req: Request, res: Response): Promise<void> {
        try {
            const codIngreso = parseInt(req.params.id);
            const { cantidad, observaciones } = req.body;
            
            if (isNaN(codIngreso)) {
                res.status(400).json({
                    success: false,
                    mensaje: 'ID de ingreso inválido',
                    timestamp: new Date().toISOString()
                });
                return;
            }

            const ingresoExistente = await this.servicioIngresos.obtenerIngresoPorIdInterno(codIngreso);
            if (!ingresoExistente) {
                res.status(404).json({
                    success: false,
                    mensaje: 'Ingreso no encontrado',
                    timestamp: new Date().toISOString()
                });
                return;
            }

            const ingreso = new IngresosServiciosOtros(
                codIngreso,
                ingresoExistente.servicio,
                ingresoExistente.fecha,
                cantidad || ingresoExistente.cantidad,
                ingresoExistente.servicio.getPrecio() * (cantidad || ingresoExistente.cantidad),
                observaciones || ingresoExistente.observaciones,
                true
            );
            
            await this.servicioIngresos.actualizarIngreso(ingreso, res);
        } catch (error) {
            await this.handleError(error, res, 'Error al actualizar el ingreso');
        }
    }

    public async llamarAnular(req: Request, res: Response): Promise<void> {
        try {
            const codIngreso = parseInt(req.params.id);
            if (isNaN(codIngreso)) {
                res.status(400).json({
                    success: false,
                    mensaje: 'ID de ingreso inválido',
                    timestamp: new Date().toISOString()
                });
                return;
            }
            await this.servicioIngresos.anularIngreso(codIngreso, res);
        } catch (error) {
            await this.handleError(error, res, 'Error al anular el ingreso');
        }
    }
}

export default new IngresosServiciosOtrosController();
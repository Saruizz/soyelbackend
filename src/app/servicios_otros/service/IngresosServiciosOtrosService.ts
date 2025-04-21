import { Response } from "express";
import IngresosServiciosOtros from "../model/IngresosServiciosOtros";
import IngresosServiciosOtrosRepository from "../repository/IngresosServiciosOtrosRepository";
import ServiciosOtrosRepository from "../repository/ServiciosOtrosRepository";

/**
 * Interfaz para respuestas del servicio
 */
interface ServiceResponse<T = any> {
    mensaje: string;
    success: boolean;
    data?: T;
    error?: string;
    timestamp: string;
}

/**
 * Servicio para la gestión de ingresos de servicios otros
 * Implementa el patrón Singleton para asegurar una única instancia
 * @class IngresosServiciosOtrosService
 * @extends {IngresosServiciosOtrosRepository}
 */
class IngresosServiciosOtrosService extends IngresosServiciosOtrosRepository {
    private static instance: IngresosServiciosOtrosService | null = null;

    private constructor() {
        super();
    }

    public static getInstance(): IngresosServiciosOtrosService {
        if (!IngresosServiciosOtrosService.instance) {
            IngresosServiciosOtrosService.instance = new IngresosServiciosOtrosService();
        }
        return IngresosServiciosOtrosService.instance;
    }

    /**
     * Valida los datos básicos de un ingreso
     * @param {IngresosServiciosOtros} ingreso - Ingreso a validar
     * @returns {ServiceResponse | null} Mensaje de error o null si es válido
     */
    private validateIngreso(ingreso: IngresosServiciosOtros): ServiceResponse | null {
        if (!ingreso) {
            return { mensaje: "Los datos del ingreso son requeridos" };
        }

        if (typeof ingreso.cantidad !== 'number' || ingreso.cantidad <= 0) {
            return { mensaje: "La cantidad debe ser un número mayor a 0" };
        }

        if (ingreso.cod_ingreso && (typeof ingreso.cod_ingreso !== 'number' || ingreso.cod_ingreso <= 0)) {
            return { mensaje: "El código de ingreso debe ser un número válido mayor a 0" };
        }

        if (!ingreso.fecha || !(ingreso.fecha instanceof Date) || isNaN(ingreso.fecha.getTime())) {
            return { mensaje: "La fecha del ingreso es requerida y debe ser válida" };
        }

        if (!ingreso.servicio || !ingreso.servicio.cod_servicio) {
            return { mensaje: "El servicio es requerido" };
        }

        return null;
    }

    /**
     * Valida los datos de un servicio
     * @param {any} servicio - Servicio a validar
     * @returns {Promise<ServiceResponse | null>} Mensaje de error o null si es válido
     */
    private async validateService(servicio: ServiciosOtros): Promise<ServiceResponse | null> {
        if (!servicio || !servicio.cod_servicio) {
            return { mensaje: "El servicio es requerido y debe tener un código válido" };
        }

        const servicioActual = await ServiciosOtrosRepository.obtenerServicioPorId(servicio.cod_servicio);
        if (!servicioActual) {
            return { mensaje: `Servicio con código ${servicio.cod_servicio} no encontrado` };
        }

        if (!servicioActual.estado) {
            return { mensaje: `Servicio con código ${servicio.cod_servicio} se encuentra inactivo` };
        }

        return null;
    }

    /**
     * Maneja los errores de manera consistente
     * @param {any} error - Error capturado
     * @param {string} action - Acción que se estaba realizando
     * @returns {ServiceResponse} Respuesta de error formateada
     */
    interface ServiceError {
        code: string;
        message: string;
        details?: any;
    }

    private handleError(error: any, action: string): ServiceResponse {
        const serviceError: ServiceError = {
            code: 'INTERNAL_ERROR',
            message: `Error al ${action}`,
            details: error instanceof Error ? error.message : String(error)
        };
    
        console.error(`Error en IngresosServiciosOtrosService.${action}:`, {
            error: serviceError,
            timestamp: new Date().toISOString(),
            stack: error instanceof Error ? error.stack : undefined
        });
    
        return {
            mensaje: serviceError.message,
            error: serviceError.code
        };
    }

    /**
     * Registra un nuevo ingreso de servicio
     * @param {IngresosServiciosOtros} ingreso - Datos del ingreso a registrar
     * @param {Response} res - Objeto de respuesta Express
     * @returns {Promise<any>} Respuesta con el resultado del registro
     */
    public async registrarIngreso(ingreso: IngresosServiciosOtros, res: Response): Promise<any> {
        try {
            const validationError = this.validateIngreso(ingreso);
            if (validationError) {
                return res.status(400).json(validationError);
            }

            const serviceError = await this.validateService(ingreso.servicio);
            if (serviceError) {
                return res.status(400).json(serviceError);
            }

            const servicio = await ServiciosOtrosRepository.obtenerServicioPorId(ingreso.servicio.cod_servicio);
            ingreso.total = servicio.precio * ingreso.cantidad;

            const resultado = await IngresosServiciosOtrosRepository.registrarIngreso(ingreso);
            return res.status(201).json({
                mensaje: "Ingreso registrado exitosamente",
                ingreso: resultado
            });
        } catch (error) {
            return res.status(500).json(this.handleError(error, "registrar el ingreso"));
        }
    }

    /**
     * Obtiene todos los ingresos activos
     * @param {Response} res - Objeto de respuesta Express
     * @returns {Promise<any>} Lista de ingresos activos
     */
    public async obtenerIngresos(res: Response): Promise<any> {
        try {
            const ingresos = await IngresosServiciosOtrosRepository.obtenerIngresos();
            
            if (!ingresos || !Array.isArray(ingresos) || ingresos.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontraron ingresos registrados"
                });
            }
            
            const ingresosActivos = ingresos.filter(ingreso => ingreso && typeof ingreso === 'object' && ingreso.estado === true);
            
            if (ingresosActivos.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontraron ingresos activos"
                });
            }
            
            return res.status(200).json({
                mensaje: "Lista de ingresos obtenida exitosamente",
                ingresos: ingresosActivos
            });
        } catch (error) {
            return res.status(500).json(this.handleError(error, "obtener los ingresos"));
        }
    }

    /**
     * Obtiene un ingreso específico por su ID
     * @param {number} codIngreso - Código del ingreso a buscar
     * @param {Response} res - Objeto de respuesta Express
     * @returns {Promise<any>} Ingreso encontrado o mensaje de error
     */
    public async obtenerIngresoPorId(codIngreso: number, res: Response): Promise<any> {
        try {
            if (!codIngreso || typeof codIngreso !== 'number' || codIngreso <= 0) {
                return res.status(400).json({
                    mensaje: "El código de ingreso debe ser un número válido mayor a 0"
                });
            }
            
            const ingreso = await IngresosServiciosOtrosRepository.obtenerIngresoPorId(codIngreso);
            
            if (!ingreso) {
                return res.status(404).json({
                    mensaje: "Ingreso no encontrado"
                });
            }
            
            if (!ingreso.estado) {
                return res.status(404).json({
                    mensaje: "El ingreso se encuentra inactivo"
                });
            }
            
            return res.status(200).json({
                mensaje: "Ingreso encontrado exitosamente",
                ingreso
            });
        } catch (error) {
            return res.status(500).json(this.handleError(error, "obtener el ingreso"));
        }
    }

    /**
     * Obtiene un ingreso por su ID sin enviar respuesta HTTP (para uso interno)
     * @param {number} codIngreso - Código del ingreso a buscar
     * @returns {Promise<IngresosServiciosOtros|null>} Ingreso encontrado o null
     */
    public async obtenerIngresoPorIdInterno(codIngreso: number): Promise<IngresosServiciosOtros|null> {
        try {
            if (!codIngreso || typeof codIngreso !== 'number' || codIngreso <= 0) {
                return null;
            }
            
            return await IngresosServiciosOtrosRepository.obtenerIngresoPorId(codIngreso);
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.obtenerIngresoPorIdInterno:", error);
            return null;
        }
    }

    /**
     * Obtiene ingresos por rango de fechas
     * @param {Date} fechaInicio - Fecha inicial del rango de búsqueda
     * @param {Date} fechaFin - Fecha final del rango de búsqueda
     * @param {Response} res - Objeto de respuesta Express
     * @returns {Promise<any>} Lista de ingresos dentro del rango de fechas especificado
     */
    public async obtenerIngresosPorFecha(fechaInicio: Date, fechaFin: Date, res: Response): Promise<any> {
        try {
            if (!fechaInicio || !fechaFin) {
                return res.status(400).json({
                    mensaje: "Ambas fechas son requeridas"
                });
            }
            
            if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date)) {
                return res.status(400).json({
                    mensaje: "Las fechas proporcionadas no son válidas"
                });
            }

            if (isNaN(fechaInicio.getTime()) || isNaN(fechaFin.getTime())) {
                return res.status(400).json({
                    mensaje: "Las fechas proporcionadas no son válidas"
                });
            }

            if (fechaInicio > fechaFin) {
                return res.status(400).json({
                    mensaje: "La fecha de inicio debe ser menor o igual a la fecha fin"
                });
            }

            const ingresos = await IngresosServiciosOtrosRepository.obtenerIngresosPorFecha(fechaInicio, fechaFin);
            
            if (!ingresos || !Array.isArray(ingresos) || ingresos.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontraron ingresos en el rango de fechas especificado"
                });
            }

            const ingresosActivos = ingresos.filter(ingreso => ingreso && ingreso.estado === true);
            
            if (ingresosActivos.length === 0) {
                return res.status(404).json({
                    mensaje: "No se encontraron ingresos activos en el rango de fechas especificado"
                });
            }

            return res.status(200).json({
                mensaje: "Ingresos por fecha obtenidos exitosamente",
                ingresos: ingresosActivos
            });
        } catch (error) {
            return res.status(500).json(this.handleError(error, "obtener los ingresos por fecha"));
        }
    }

    /**
     * Actualiza la información de un ingreso existente
     * @param {IngresosServiciosOtros} ingreso - Datos actualizados del ingreso
     * @param {Response} res - Objeto de respuesta Express
     * @returns {Promise<any>} Ingreso actualizado o mensaje de error
     */
    public async actualizarIngreso(ingreso: IngresosServiciosOtros, res: Response): Promise<any> {
        try {
            const validationError = this.validateIngreso(ingreso);
            if (validationError) {
                return res.status(400).json(validationError);
            }
            
            const codIngreso = ingreso.cod_ingreso;
            if (!codIngreso || typeof codIngreso !== 'number' || codIngreso <= 0) {
                return res.status(400).json({
                    mensaje: "El código de ingreso debe ser un número válido mayor a 0"
                });
            }

            const ingresoExistente = await IngresosServiciosOtrosRepository.obtenerIngresoPorId(codIngreso);
            if (!ingresoExistente) {
                return res.status(404).json({
                    mensaje: "Ingreso no encontrado"
                });
            }
            
            if (!ingresoExistente.estado) {
                return res.status(400).json({
                    mensaje: "No se puede actualizar un ingreso inactivo"
                });
            }

            // Verificar y obtener información del servicio
            if (!ingreso.servicio) {
                if (!ingresoExistente.servicio) {
                    return res.status(400).json({
                        mensaje: "Datos del servicio son requeridos"
                    });
                }
                ingreso.servicio = ingresoExistente.servicio;
            }

            const serviceError = await this.validateService(ingreso.servicio);
            if (serviceError) {
                return res.status(400).json(serviceError);
            }

            // Obtener el servicio actualizado y calcular el total
            const servicioActual = await ServiciosOtrosRepository.obtenerServicioPorId(ingreso.servicio.cod_servicio);
            ingreso.total = servicioActual.precio * ingreso.cantidad;

            const resultado = await IngresosServiciosOtrosRepository.actualizarIngreso(ingreso);
            return res.status(200).json({
                mensaje: "Ingreso actualizado exitosamente",
                ingreso: resultado
            });
        } catch (error) {
            return res.status(500).json(this.handleError(error, "actualizar el ingreso"));
        }
    }

    /**
     * Anula (desactiva) un ingreso existente
     * @param {number} codIngreso - Código del ingreso a anular
     * @param {Response} res - Objeto de respuesta Express
     * @returns {Promise<any>} Resultado de la anulación
     */
    public async anularIngreso(codIngreso: number, res: Response): Promise<any> {
        try {
            if (!codIngreso || typeof codIngreso !== 'number' || codIngreso <= 0) {
                return res.status(400).json({
                    mensaje: "El código de ingreso debe ser un número válido mayor a 0"
                });
            }
            
            const ingresoExistente = await IngresosServiciosOtrosRepository.obtenerIngresoPorId(codIngreso);
            if (!ingresoExistente) {
                return res.status(404).json({
                    mensaje: "Ingreso no encontrado"
                });
            }
            
            if (!ingresoExistente.estado) {
                return res.status(400).json({
                    mensaje: "El ingreso ya se encuentra anulado"
                });
            }

            const resultado = await IngresosServiciosOtrosRepository.anularIngreso(codIngreso);
            return res.status(200).json({
                mensaje: "Ingreso anulado exitosamente",
                ingreso: resultado
            });
        } catch (error) {
            return res.status(500).json(this.handleError(error, "anular el ingreso"));
        }
    }
}

export default IngresosServiciosOtrosService;
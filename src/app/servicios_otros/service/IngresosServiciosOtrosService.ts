import { Response } from "express";
import IngresosServiciosOtros from "../model/IngresosServiciosOtros";
import IngresosServiciosOtrosRepository from "../repository/IngresosServiciosOtrosRepository";
import ServiciosOtrosRepository from "../repository/ServiciosOtrosRepository";

class IngresosServiciosOtrosService extends IngresosServiciosOtrosRepository {
    // Registrar un nuevo ingreso
    public static async registrarIngreso(ingreso: IngresosServiciosOtros, res: Response): Promise<any> {
        try {
            // Validaciones básicas
            if (ingreso.getCantidad() <= 0) {
                return res.status(400).json({
                    mensaje: "La cantidad debe ser mayor a 0"
                });
            }

            if (!ingreso.getServicio()) {
                return res.status(400).json({
                    mensaje: "El servicio es requerido"
                });
            }
            
            // Verificar que el servicio existe
            const servicio = await ServiciosOtrosRepository.obtenerServicioPorId(ingreso.getServicio().getCodServicio());
            if (!servicio || !servicio.estado) {
                return res.status(404).json({
                    mensaje: "Servicio no encontrado o inactivo"
                });
            }

            // Calcular el total del ingreso
            ingreso.calcularTotal();

            const resultado = await IngresosServiciosOtrosRepository.registrarIngreso(ingreso);
            return res.status(201).json({
                mensaje: "Ingreso registrado exitosamente",
                ingreso: resultado
            });
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.registrarIngreso:", error);
            return res.status(500).json({
                mensaje: "Error al registrar el ingreso",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Obtener todos los ingresos
    public static async obtenerIngresos(res: Response): Promise<any> {
        try {
            const ingresos = await IngresosServiciosOtrosRepository.obtenerIngresos();
            return res.status(200).json({
                mensaje: "Lista de ingresos obtenida exitosamente",
                ingresos: ingresos.filter(ingreso => ingreso.estado !== false)
            });
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.obtenerIngresos:", error);
            return res.status(500).json({
                mensaje: "Error al obtener los ingresos",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Obtener un ingreso por ID
    public static async obtenerIngresoPorId(codIngreso: number, res: Response): Promise<any> {
        try {
            const ingreso = await IngresosServiciosOtrosRepository.obtenerIngresoPorId(codIngreso);
            if (!ingreso || ingreso.estado === false) {
                return res.status(404).json({
                    mensaje: "Ingreso no encontrado"
                });
            }
            return res.status(200).json({
                mensaje: "Ingreso encontrado exitosamente",
                ingreso
            });
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.obtenerIngresoPorId:", error);
            return res.status(500).json({
                mensaje: "Error al obtener el ingreso",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Obtener ingresos por rango de fechas
    public static async obtenerIngresosPorFecha(fechaInicio: Date, fechaFin: Date, res: Response): Promise<any> {
        try {
            if (fechaInicio > fechaFin) {
                return res.status(400).json({
                    mensaje: "La fecha de inicio debe ser menor o igual a la fecha fin"
                });
            }

            const ingresos = await IngresosServiciosOtrosRepository.obtenerIngresosPorFecha(fechaInicio, fechaFin);
            return res.status(200).json({
                mensaje: "Ingresos por fecha obtenidos exitosamente",
                ingresos: ingresos.filter(ingreso => ingreso.estado !== false)
            });
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.obtenerIngresosPorFecha:", error);
            return res.status(500).json({
                mensaje: "Error al obtener los ingresos por fecha",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Actualizar un ingreso
    public static async actualizarIngreso(ingreso: IngresosServiciosOtros, res: Response): Promise<any> {
        try {
            // Validaciones básicas
            if (ingreso.getCantidad() <= 0) {
                return res.status(400).json({
                    mensaje: "La cantidad debe ser mayor a 0"
                });
            }

            const ingresoExistente = await IngresosServiciosOtrosRepository.obtenerIngresoPorId(ingreso.getCodIngreso());
            if (!ingresoExistente) {
                return res.status(404).json({
                    mensaje: "Ingreso no encontrado"
                });
            }

            // Recalcular el total
            ingreso.calcularTotal();

            const resultado = await IngresosServiciosOtrosRepository.actualizarIngreso(ingreso);
            return res.status(200).json({
                mensaje: "Ingreso actualizado exitosamente",
                ingreso: resultado
            });
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.actualizarIngreso:", error);
            return res.status(500).json({
                mensaje: "Error al actualizar el ingreso",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Anular un ingreso
    public static async anularIngreso(codIngreso: number, res: Response): Promise<any> {
        try {
            const ingresoExistente = await IngresosServiciosOtrosRepository.obtenerIngresoPorId(codIngreso);
            if (!ingresoExistente) {
                return res.status(404).json({
                    mensaje: "Ingreso no encontrado"
                });
            }

            const resultado = await IngresosServiciosOtrosRepository.anularIngreso(codIngreso);
            return res.status(200).json({
                mensaje: "Ingreso anulado exitosamente",
                ingreso: resultado
            });
        } catch (error) {
            console.error("Error en IngresosServiciosOtrosService.anularIngreso:", error);
            return res.status(500).json({
                mensaje: "Error al anular el ingreso",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}

export default IngresosServiciosOtrosService;
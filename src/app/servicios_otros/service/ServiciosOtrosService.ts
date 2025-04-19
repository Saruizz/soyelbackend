import { Response } from "express";
import ServiciosOtros from "../model/ServiciosOtros";
import ServiciosOtrosRepository from "../repository/ServiciosOtrosRepository";

class ServiciosOtrosService extends ServiciosOtrosRepository {
    // Crear un nuevo servicio
    public static async crearServicio(servicio: ServiciosOtros, res: Response): Promise<any> {
        try {
            // Validaciones básicas
            if (!servicio.getNombreServicio() || servicio.getPrecio() < 0) {
                return res.status(400).json({
                    mensaje: "Nombre de servicio requerido y precio debe ser mayor o igual a 0"
                });
            }

            const resultado = await ServiciosOtrosRepository.crearServicio(servicio);
            return res.status(201).json({
                mensaje: "Servicio creado exitosamente",
                servicio: resultado
            });
        } catch (error) {
            console.error("Error en ServiciosOtrosService.crearServicio:", error);
            return res.status(500).json({
                mensaje: "Error al crear el servicio",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Obtener todos los servicios
    public static async obtenerServicios(res: Response): Promise<any> {
        try {
            const servicios = await ServiciosOtrosRepository.obtenerServicios();
            return res.status(200).json({
                mensaje: "Lista de servicios obtenida exitosamente",
                servicios
            });
        } catch (error) {
            console.error("Error en ServiciosOtrosService.obtenerServicios:", error);
            return res.status(500).json({
                mensaje: "Error al obtener los servicios",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Obtener un servicio por ID
    public static async obtenerServicioPorId(codServicio: number, res: Response): Promise<any> {
        try {
            const servicio = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);
            if (!servicio) {
                return res.status(404).json({
                    mensaje: "Servicio no encontrado"
                });
            }
            return res.status(200).json({
                mensaje: "Servicio encontrado exitosamente",
                servicio
            });
        } catch (error) {
            console.error("Error en ServiciosOtrosService.obtenerServicioPorId:", error);
            return res.status(500).json({
                mensaje: "Error al obtener el servicio",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Actualizar un servicio
    public static async actualizarServicio(servicio: ServiciosOtros, res: Response): Promise<any> {
        try {
            // Validaciones básicas
            if (!servicio.getNombreServicio() || servicio.getPrecio() < 0) {
                return res.status(400).json({
                    mensaje: "Nombre de servicio requerido y precio debe ser mayor o igual a 0"
                });
            }

            const servicioExistente = await ServiciosOtrosRepository.obtenerServicioPorId(servicio.getCodServicio());
            if (!servicioExistente) {
                return res.status(404).json({
                    mensaje: "Servicio no encontrado"
                });
            }

            const resultado = await ServiciosOtrosRepository.actualizarServicio(servicio);
            return res.status(200).json({
                mensaje: "Servicio actualizado exitosamente",
                servicio: resultado
            });
        } catch (error) {
            console.error("Error en ServiciosOtrosService.actualizarServicio:", error);
            return res.status(500).json({
                mensaje: "Error al actualizar el servicio",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }

    // Eliminar un servicio (cambiar estado)
    public static async eliminarServicio(codServicio: number, res: Response): Promise<any> {
        try {
            const servicioExistente = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);
            if (!servicioExistente) {
                return res.status(404).json({
                    mensaje: "Servicio no encontrado"
                });
            }

            const resultado = await ServiciosOtrosRepository.eliminarServicio(codServicio);
            return res.status(200).json({
                mensaje: "Servicio eliminado exitosamente",
                servicio: resultado
            });
        } catch (error) {
            console.error("Error en ServiciosOtrosService.eliminarServicio:", error);
            return res.status(500).json({
                mensaje: "Error al eliminar el servicio",
                error: error instanceof Error ? error.message : String(error)
            });
        }
    }
}

export default ServiciosOtrosService;
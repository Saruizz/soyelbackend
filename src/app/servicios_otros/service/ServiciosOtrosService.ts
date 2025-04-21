import { Response } from "express";
import { ServiceResponse } from "../interfaces/ServiceResponse";
import ServiciosOtros from "../model/ServiciosOtros";
import ServiciosOtrosRepository from "../repository/ServiciosOtrosRepository";

class ServiciosOtrosService {
    private static instance: ServiciosOtrosService | null = null;

    private constructor() {}

    public static getInstance(): ServiciosOtrosService {
        if (!ServiciosOtrosService.instance) {
            ServiciosOtrosService.instance = new ServiciosOtrosService();
        }
        return ServiciosOtrosService.instance;
    }

    private createResponse<T>(success: boolean, mensaje: string, data?: T, error?: string): ServiceResponse<T> {
        return {
            mensaje,
            success,
            data,
            error,
            timestamp: new Date().toISOString()
        };
    }

    private validateServicio(servicio: ServiciosOtros): string | null {
        if (!servicio.getNombreServicio()) {
            return "El nombre del servicio es requerido";
        }
        if (servicio.getPrecio() < 0) {
            return "El precio debe ser mayor o igual a 0";
        }
        return null;
    }

    public async crearServicio(servicio: ServiciosOtros, res: Response): Promise<Response> {
        try {
            const validationError = this.validateServicio(servicio);
            if (validationError) {
                return res.status(400).json(
                    this.createResponse(false, validationError)
                );
            }

            const resultado = await ServiciosOtrosRepository.crearServicio(servicio);
            return res.status(201).json(
                this.createResponse(true, "Servicio creado exitosamente", resultado)
            );
        } catch (error) {
            console.error("Error en ServiciosOtrosService.crearServicio:", error);
            return res.status(500).json(
                this.createResponse(false, "Error al crear el servicio", null, 
                    error instanceof Error ? error.message : String(error))
            );
        }
    }

    public async obtenerServicios(res: Response): Promise<Response> {
        try {
            const servicios = await ServiciosOtrosRepository.obtenerServicios();
            if (!servicios || servicios.length === 0) {
                return res.status(404).json(
                    this.createResponse(false, "No se encontraron servicios")
                );
            }

            return res.status(200).json(
                this.createResponse(true, "Lista de servicios obtenida exitosamente", servicios)
            );
        } catch (error) {
            console.error("Error en ServiciosOtrosService.obtenerServicios:", error);
            return res.status(500).json(
                this.createResponse(false, "Error al obtener los servicios", null,
                    error instanceof Error ? error.message : String(error))
            );
        }
    }

    public async obtenerServicioPorId(codServicio: number, res: Response): Promise<Response> {
        try {
            if (!codServicio || codServicio <= 0) {
                return res.status(400).json(
                    this.createResponse(false, "Código de servicio inválido")
                );
            }

            const servicio = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);
            if (!servicio) {
                return res.status(404).json(
                    this.createResponse(false, "Servicio no encontrado")
                );
            }

            return res.status(200).json(
                this.createResponse(true, "Servicio encontrado exitosamente", servicio)
            );
        } catch (error) {
            console.error("Error en ServiciosOtrosService.obtenerServicioPorId:", error);
            return res.status(500).json(
                this.createResponse(false, "Error al obtener el servicio", null,
                    error instanceof Error ? error.message : String(error))
            );
        }
    }

    public async actualizarServicio(servicio: ServiciosOtros, res: Response): Promise<Response> {
        try {
            const validationError = this.validateServicio(servicio);
            if (validationError) {
                return res.status(400).json(
                    this.createResponse(false, validationError)
                );
            }

            const servicioExistente = await ServiciosOtrosRepository.obtenerServicioPorId(servicio.getCodServicio());
            if (!servicioExistente) {
                return res.status(404).json(
                    this.createResponse(false, "Servicio no encontrado")
                );
            }

            const resultado = await ServiciosOtrosRepository.actualizarServicio(servicio);
            return res.status(200).json(
                this.createResponse(true, "Servicio actualizado exitosamente", resultado)
            );
        } catch (error) {
            console.error("Error en ServiciosOtrosService.actualizarServicio:", error);
            return res.status(500).json(
                this.createResponse(false, "Error al actualizar el servicio", null,
                    error instanceof Error ? error.message : String(error))
            );
        }
    }

    public async eliminarServicio(codServicio: number, res: Response): Promise<Response> {
        try {
            if (!codServicio || codServicio <= 0) {
                return res.status(400).json(
                    this.createResponse(false, "Código de servicio inválido")
                );
            }

            const servicioExistente = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);
            if (!servicioExistente) {
                return res.status(404).json(
                    this.createResponse(false, "Servicio no encontrado")
                );
            }

            const resultado = await ServiciosOtrosRepository.eliminarServicio(codServicio);
            return res.status(200).json(
                this.createResponse(true, "Servicio eliminado exitosamente", resultado)
            );
        } catch (error) {
            console.error("Error en ServiciosOtrosService.eliminarServicio:", error);
            return res.status(500).json(
                this.createResponse(false, "Error al eliminar el servicio", null,
                    error instanceof Error ? error.message : String(error))
            );
        }
    }
}

export default ServiciosOtrosService;
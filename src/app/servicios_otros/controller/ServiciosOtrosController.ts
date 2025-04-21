import { Request, Response } from 'express';
import ServiciosOtros from '../model/ServiciosOtros';
import ServiciosOtrosRepository from '../repository/ServiciosOtrosRepository';

class ServiciosOtrosController extends ServiciosOtrosRepository {
    public async crearServicio(req: Request, res: Response): Promise<void> {
        try {
            const { nombre_servicio, descripcion, precio } = req.body;
            const servicio = new ServiciosOtros(
                0,
                nombre_servicio,
                descripcion,
                precio,
                true
            );

            const resultado = await ServiciosOtrosRepository.crearServicio(servicio);
            res.status(201).json({
                mensaje: 'Servicio creado exitosamente',
                servicio: resultado
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al crear el servicio',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    public async obtenerServicios(_req: Request, res: Response): Promise<void> {
        try {
            const servicios = await ServiciosOtrosRepository.obtenerServicios();
            res.status(200).json(servicios);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener los servicios',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    public async obtenerServicioPorId(req: Request, res: Response): Promise<void> {
        try {
            const codServicio = parseInt(req.params.id);
            const servicio = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);

            if (!servicio) {
                res.status(404).json({ mensaje: 'Servicio no encontrado' });
                return;
            }

            res.status(200).json(servicio);
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al obtener el servicio',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    public async actualizarServicio(req: Request, res: Response): Promise<void> {
        try {
            const codServicio = parseInt(req.params.id);
            const { nombre_servicio, descripcion, precio, estado } = req.body;

            const servicioExistente = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);
            if (!servicioExistente) {
                res.status(404).json({ mensaje: 'Servicio no encontrado' });
                return;
            }

            const servicio = new ServiciosOtros(
                codServicio,
                nombre_servicio,
                descripcion,
                precio,
                estado
            );

            const resultado = await ServiciosOtrosRepository.actualizarServicio(servicio);
            res.status(200).json({
                mensaje: 'Servicio actualizado exitosamente',
                servicio: resultado
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al actualizar el servicio',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }

    public async eliminarServicio(req: Request, res: Response): Promise<void> {
        try {
            const codServicio = parseInt(req.params.id);
            const servicioExistente = await ServiciosOtrosRepository.obtenerServicioPorId(codServicio);

            if (!servicioExistente) {
                res.status(404).json({ mensaje: 'Servicio no encontrado' });
                return;
            }

            const resultado = await ServiciosOtrosRepository.eliminarServicio(codServicio);
            res.status(200).json({
                mensaje: 'Servicio eliminado exitosamente',
                servicio: resultado
            });
        } catch (error) {
            res.status(500).json({
                mensaje: 'Error al eliminar el servicio',
                error: error instanceof Error ? error.message : 'Error desconocido'
            });
        }
    }
}

export default new ServiciosOtrosController();
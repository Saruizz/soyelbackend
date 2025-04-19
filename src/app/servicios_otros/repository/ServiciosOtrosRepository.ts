import { Response } from "express";
import pool from "../../../config/connection/connectionDB";
import ServiciosOtros from "../model/ServiciosOtros";

class ServiciosOtrosRepository {
    protected static async crearServicio(servicio: ServiciosOtros): Promise<any> {
        const consulta = `
            INSERT INTO servicios_otros(nombre_servicio, descripcion, precio, estado)
            VALUES ($1, $2, $3, $4)
            RETURNING cod_servicio;
        `;
        const valores = [
            servicio.getNombreServicio,
            servicio.getDescripcion,
            servicio.getPrecio,
            servicio.getEstado
        ];

        try {
            const res = await pool.query(consulta, valores);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    protected static async obtenerServicios(): Promise<any> {
        const consulta = `
            SELECT cod_servicio, nombre_servicio, descripcion, precio, estado
            FROM servicios_otros
            ORDER BY cod_servicio;
        `;

        try {
            const res = await pool.query(consulta);
            return res.rows;
        } catch (error) {
            throw error;
        }
    }

    protected static async obtenerServicioPorId(codServicio: number): Promise<any> {
        const consulta = `
            SELECT cod_servicio, nombre_servicio, descripcion, precio, estado
            FROM servicios_otros
            WHERE cod_servicio = $1;
        `;

        try {
            const res = await pool.query(consulta, [codServicio]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    protected static async actualizarServicio(servicio: ServiciosOtros): Promise<any> {
        const consulta = `
            UPDATE servicios_otros
            SET nombre_servicio = $1, descripcion = $2, precio = $3, estado = $4
            WHERE cod_servicio = $5
            RETURNING *;
        `;
        const valores = [
            servicio.getNombreServicio,
            servicio.getDescripcion,
            servicio.getPrecio,
            servicio.getEstado,
            servicio.getCodServicio
        ];

        try {
            const res = await pool.query(consulta, valores);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }

    protected static async eliminarServicio(codServicio: number): Promise<any> {
        const consulta = `
            UPDATE servicios_otros
            SET estado = false
            WHERE cod_servicio = $1
            RETURNING *;
        `;

        try {
            const res = await pool.query(consulta, [codServicio]);
            return res.rows[0];
        } catch (error) {
            throw error;
        }
    }
}

export default ServiciosOtrosRepository;
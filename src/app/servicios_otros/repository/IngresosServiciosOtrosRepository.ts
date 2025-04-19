import { Response } from "express";
import pool from "../../../config/connection/dbConnection";
import IngresosServiciosOtros from "../model/IngresosServiciosOtros";

interface IngresoRecord {
    cod_ingreso: number;
    cod_servicio: number;
    fecha_ingreso: Date;
    cantidad: number;
    total_ingreso: number;
    observaciones?: string;
    estado: boolean;
    nombre_servicio: string;
    precio: number;
}

class IngresosServiciosOtrosRepository {
    protected static async registrarIngreso(ingreso: IngresosServiciosOtros): Promise<IngresoRecord> {
        const consulta = `
            INSERT INTO ingresos_servicios_otros(
                cod_servicio, fecha_ingreso, cantidad, total_ingreso, observaciones, estado
            )
            VALUES ($1, $2, $3, $4, $5, true)
            RETURNING *;
        `;
        const valores = [
            ingreso.servicio.codServicio,
            ingreso.fechaIngreso,
            ingreso.cantidad,
            ingreso.totalIngreso,
            ingreso.observaciones
        ];

        try {
            const res = await pool.query(consulta, valores);
            return res.rows[0];
        } catch (error) {
            throw new Error(`Error al registrar ingreso: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    protected static async obtenerIngresos(): Promise<IngresoRecord[]> {
        const consulta = `
            SELECT i.*, s.nombre_servicio, s.precio
            FROM ingresos_servicios_otros i
            INNER JOIN servicios_otros s ON i.cod_servicio = s.cod_servicio
            WHERE i.estado = true
            ORDER BY i.fecha_ingreso DESC;
        `;

        try {
            const res = await pool.query(consulta);
            return res.rows;
        } catch (error) {
            throw new Error(`Error al obtener ingresos: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    protected static async obtenerIngresoPorId(codIngreso: number): Promise<IngresoRecord | null> {
        const consulta = `
            SELECT i.*, s.nombre_servicio, s.precio
            FROM ingresos_servicios_otros i
            INNER JOIN servicios_otros s ON i.cod_servicio = s.cod_servicio
            WHERE i.cod_ingreso = $1 AND i.estado = true;
        `;

        try {
            const res = await pool.query(consulta, [codIngreso]);
            return res.rows[0] || null;
        } catch (error) {
            throw new Error(`Error al obtener ingreso por ID: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    protected static async obtenerIngresosPorFecha(fechaInicio: Date, fechaFin: Date): Promise<IngresoRecord[]> {
        const consulta = `
            SELECT i.*, s.nombre_servicio, s.precio
            FROM ingresos_servicios_otros i
            INNER JOIN servicios_otros s ON i.cod_servicio = s.cod_servicio
            WHERE i.fecha_ingreso BETWEEN $1 AND $2
            AND i.estado = true
            ORDER BY i.fecha_ingreso DESC;
        `;

        try {
            const res = await pool.query(consulta, [fechaInicio, fechaFin]);
            return res.rows;
        } catch (error) {
            throw new Error(`Error al obtener ingresos por fecha: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    protected static async actualizarIngreso(ingreso: IngresosServiciosOtros): Promise<IngresoRecord> {
        const consulta = `
            UPDATE ingresos_servicios_otros
            SET cantidad = $1, total_ingreso = $2, observaciones = $3
            WHERE cod_ingreso = $4 AND estado = true
            RETURNING *;
        `;
        const valores = [
            ingreso.cantidad,
            ingreso.totalIngreso,
            ingreso.observaciones,
            ingreso.codIngreso
        ];

        try {
            const res = await pool.query(consulta, valores);
            if (!res.rows[0]) {
                throw new Error('Ingreso no encontrado o ya anulado');
            }
            return res.rows[0];
        } catch (error) {
            throw new Error(`Error al actualizar ingreso: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }

    protected static async anularIngreso(codIngreso: number): Promise<IngresoRecord> {
        const consulta = `
            UPDATE ingresos_servicios_otros
            SET estado = false
            WHERE cod_ingreso = $1 AND estado = true
            RETURNING *;
        `;

        try {
            const res = await pool.query(consulta, [codIngreso]);
            if (!res.rows[0]) {
                throw new Error('Ingreso no encontrado o ya anulado');
            }
            return res.rows[0];
        } catch (error) {
            throw new Error(`Error al anular ingreso: ${error instanceof Error ? error.message : 'Error desconocido'}`);
        }
    }
}

export default IngresosServiciosOtrosRepository;
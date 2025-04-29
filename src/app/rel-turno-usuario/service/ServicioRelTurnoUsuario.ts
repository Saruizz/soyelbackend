import pool from "../../../config/connection/dbConnection";
import { SQL_REL_TURNO_USUARIO } from "../repository/sql_rel_turno_usuario";
import { Response } from "express";

class ServicioRelTurnoUsuario {
    public static async crearRelacion(codTurno: number, codUsuario: number, res: Response): Promise<void> {
        try {
            const resultado = await pool.one(SQL_REL_TURNO_USUARIO.INSERT, [codTurno, codUsuario]);
            res.status(201).json({ respuesta: "Relación creada", codTurnoUsuario: resultado.cod_turnousuario });
        } catch (error) {
            console.error("Error al crear relación:", error);
            res.status(500).json({ respuesta: "Error en el servidor" });
        }
    }

    public static async eliminarRelacion(codTurnoUsuario: number, res: Response): Promise<void> {
        try {
            await pool.none(SQL_REL_TURNO_USUARIO.DELETE, [codTurnoUsuario]);
            res.status(200).json({ respuesta: "Relación eliminada" });
        } catch (error) {
            console.error("Error al eliminar relación:", error);
            res.status(500).json({ respuesta: "Error en el servidor" });
        }
    }

    public static async obtenerRelacionPorId(codTurnoUsuario: number, res: Response): Promise<void> {
        try {
            const resultado = await pool.oneOrNone(SQL_REL_TURNO_USUARIO.FIND_BY_ID, [codTurnoUsuario]);
            if (resultado) {
                res.status(200).json(resultado);
            } else {
                res.status(404).json({ respuesta: "Relación no encontrada" });
            }
        } catch (error) {
            console.error("Error al obtener relación:", error);
            res.status(500).json({ respuesta: "Error en el servidor" });
        }
    }

    public static async obtenerTodasLasRelaciones(res: Response): Promise<void> {
        try {
            const resultados = await pool.manyOrNone(SQL_REL_TURNO_USUARIO.FIND_ALL);
            res.status(200).json(resultados);
        } catch (error) {
            console.error("Error al obtener relaciones:", error);
            res.status(500).json({ respuesta: "Error en el servidor" });
        }
    }

    public static async actualizarRelacion(codTurnoUsuario: number, codTurno: number, codUsuario: number, res: Response): Promise<void> {
        try {
            await pool.none(SQL_REL_TURNO_USUARIO.UPDATE, [codTurno, codUsuario, codTurnoUsuario]);
            res.status(200).json({ respuesta: "Relación actualizada" });
        } catch (error) {
            console.error("Error al actualizar relación:", error);
            res.status(500).json({ respuesta: "Error en el servidor" });
        }
    }
}

export default ServicioRelTurnoUsuario;

import pool from "../../../config/connection/dbConnection";
import { SQL_TURNO } from "../repository/sql_turno";
import { Response } from "express";

class ServicioTurnoActualizar {
    public static async actualizarTurno(objTurno: any, res: Response): Promise<void> {
        try {
            if (!objTurno.codTurno || isNaN(objTurno.codTurno)) {
                res.status(400).json({ respuesta: "Código de turno inválido" });
                return Promise.resolve();
            }
            
            console.log("🔍 Datos recibidos en actualizarTurno:", objTurno);
            
            const resultado = await pool.task(async (consulta) => {
                const turnoExistente = await consulta.oneOrNone(SQL_TURNO.FIND_BY_ID, [objTurno.codTurno]);
    
                if (!turnoExistente) {
                    return { caso: 1, objActualizado: null };
                }
    
                try {
                    const objActualizado = await consulta.result(SQL_TURNO.UPDATE, [
                        objTurno.codParqueadero,
                        objTurno.descripcionTurno,
                        objTurno.fechaTurno,
                        objTurno.horaInicioTurno,
                        objTurno.horaFinTurno,
                        objTurno.codTurno
                    ]);
    
                    return { caso: 2, objActualizado };
                } catch (error) {
                    console.error("❌ Error en la consulta UPDATE:", error);
                    throw error;
                }
            });
    
            if (resultado.caso === 1) {
                res.status(404).json({ respuesta: "El turno no existe" });
                return Promise.resolve();
            }
    
            res.status(200).json({
                respuesta: "Turno actualizado correctamente",
                filasAfectadas: resultado.objActualizado ? resultado.objActualizado.rowCount : 0
            });return Promise.resolve();
    
        } catch (error: unknown) {
            const mensajeError = error instanceof Error ? error.message : "Error desconocido";
            console.error("🚨 Error en la actualización:", mensajeError);
            res.status(500).json({ respuesta: "Error en el servidor", error: mensajeError });
            return Promise.resolve();
        }
    }
}

export default ServicioTurnoActualizar;


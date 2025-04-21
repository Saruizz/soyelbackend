import { Request, Response } from "express";
import Turno from "../model/Turno";
import ServicioTurnoCrear from "../service/ServicioTurnoCrear";

console.log("📌 ServicioTurnoCrear importado:", ServicioTurnoCrear);

class ControladorTurnoCrear {
    public async llamarGrabarTurno(req: Request, res: Response): Promise<void> {
        console.log("📩 Datos recibidos: ", req.body);

        try {
            console.log("📩 Datos recibidos en el backend:", req.body);
            // Validación de datos
            if (
                req.body.cod_parqueadero == null || // Acepta 0 como válido
                !req.body.descripcion_turno?.trim() ||
                !req.body.fecha_turno?.trim() ||
                !req.body.hora_inicio_turno?.trim() ||
                !req.body.hora_fin_turno?.trim()
            ) {
                console.error("⛔ ERROR: Algunos datos están vacíos", req.body);
                
                res.status(400).json({ error: "Datos incompletos o vacíos." });
            }

            const objTemporal = new Turno(
                0,
                req.body.cod_parqueadero,    
                req.body.descripcion_turno,   
                req.body.fecha_turno,         
                req.body.hora_inicio_turno,    
                req.body.hora_fin_turno        
            );
            console.log("📦 Objeto Turno creado:", objTemporal);
            // Guardar en BD
            await ServicioTurnoCrear.grabarTurno(objTemporal, res);
        } catch (error) {
            console.error("⛔ ERROR:", error);
            res.status(500).json({ error: "Error interno del servidor." });
        }
    }
}

const controladorTurnoCrear = new ControladorTurnoCrear();
export default controladorTurnoCrear;
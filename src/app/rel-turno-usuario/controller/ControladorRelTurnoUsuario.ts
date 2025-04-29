import { Request, Response } from "express";
import ServicioRelTurnoUsuario from "../service/ServicioRelTurnoUsuario";

class ControladorRelTurnoUsuario extends ServicioRelTurnoUsuario {
    public async crearRelacion(req: Request, res: Response): Promise<void> {
        console.log("📥 Datos recibidos en la solicitud:", req.body);
        const { cod_turno, cod_usuario } = req.body;
    
        if (!cod_turno || !cod_usuario) {
            res.status(400).json({ respuesta: "Faltan datos obligatorios en el cuerpo de la solicitud" });
            return;
        }
    
        try {
            await ServicioRelTurnoUsuario.crearRelacion( cod_turno, cod_usuario , res);
        } catch (error) {
            console.error("Error al crear relación turno-usuario:", error);
            res.status(500).json({ respuesta: "Error en el servidor" });
        }
    }

    public async eliminarRelacion(req: Request, res: Response): Promise<void> {
        const codTurnoUsuario = Number(req.params.codTurnoUsuario);
        if (isNaN(codTurnoUsuario) || codTurnoUsuario <= 0) {
            res.status(400).json({ respuesta: "Código inválido" });
            return;
        }
        await ServicioRelTurnoUsuario.eliminarRelacion(codTurnoUsuario, res);
    }

    public async obtenerRelacionPorId(req: Request, res: Response): Promise<void> {
        const codTurnoUsuario = Number(req.params.codTurnoUsuario);
        if (isNaN(codTurnoUsuario) || codTurnoUsuario <= 0) {
            res.status(400).json({ respuesta: "Código inválido" });
            return;
        }
        await ServicioRelTurnoUsuario.obtenerRelacionPorId(codTurnoUsuario, res);
    }

    public async obtenerTodasLasRelaciones(req: Request, res: Response): Promise<void> {
        await ServicioRelTurnoUsuario.obtenerTodasLasRelaciones(res);
    }

    public async actualizarRelacion(req: Request, res: Response): Promise<void> {
        const codTurnoUsuario = Number(req.params.codTurnoUsuario);
    
        if (isNaN(codTurnoUsuario) || codTurnoUsuario <= 0) {
            res.status(400).json({ respuesta: "Código inválido" });
            return;
        }
    
        const { cod_turno, cod_usuario } = req.body;
    
        if (!cod_turno || !cod_usuario) {
            res.status(400).json({ respuesta: "Faltan datos obligatorios en el cuerpo de la solicitud" });
            return;
        }
    
        try {
            await ServicioRelTurnoUsuario.actualizarRelacion(
                codTurnoUsuario,
                cod_turno,
                cod_usuario
            , res);
        } catch (error) {
            console.error("Error en la actualización:", error);
            res.status(500).json({ respuesta: "Error interno del servidor" });
        }
    }
}

export default new ControladorRelTurnoUsuario();

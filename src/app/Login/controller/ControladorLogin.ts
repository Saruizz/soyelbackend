import { Request, Response } from "express";
import ServicioLogin from "../service/ServicioLogin";

class ControladorLogin extends ServicioLogin {
    public llamarIniciarSesion(req: Request, res: Response): void {
        ServicioLogin.iniciarSesion(req, res);
    }

    public llamarValidarSesion(req: Request, res: Response): void {
        ServicioLogin.validarSesion(req, res);
    }

    public llamarCerrarSesion(req: Request, res: Response): void {
        ServicioLogin.cerrarSesion(req, res);
    }

    public llamarObtenerHistorialIngresos(req: Request, res: Response): void {
        ServicioLogin.obtenerHistorialIngresos(req, res);
    }
}

const controladorLogin = new ControladorLogin();
export default controladorLogin;

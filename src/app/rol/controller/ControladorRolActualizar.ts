import { Request, Response } from "express";
import ServicioRolActualizar from "../service/ServicioRolActualizar";
import Rol from "../model/Rol";

class ControladorRolActualizar extends ServicioRolActualizar {
    public llamarActualizar(req: Request, res: Response): void {
        const objTemportal = new Rol(0, "");
        objTemportal.codRol = req.body.codRol;
        objTemportal.nombreRol = req.body.nombreRol;
        ServicioRolActualizar.actualizarRol(objTemportal, res);
    }
}

const controladorRolActualizar = new ControladorRolActualizar();
export default controladorRolActualizar;
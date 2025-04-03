import { Request, Response } from "express";

import Rol from "../model/Rol";
import ServicioRolCrear from "../service/ServicioRolCrear";

class ControladorRolCrear extends ServicioRolCrear {
    public llamarGrabarRol(req: Request, res: Response): void {
        const objTemporal = new Rol(0, "");
        objTemporal.nombreRol = req.body.nombreRol;
        ServicioRolCrear.grabarRol(objTemporal, res);
    }
}

const controladorRolCrear = new ControladorRolCrear();
export default controladorRolCrear;
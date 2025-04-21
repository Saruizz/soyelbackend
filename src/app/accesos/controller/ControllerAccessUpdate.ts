import { Request, Response } from "express";
import ServicesAccessupdate from "../service/ServicesAccessupdate";
import Accesos from "../model/Accesos";

class ControllerAccessUpdate extends ServicesAccessupdate {
    public update(req:Request, res:Response):void{
        const objTemporal: Accesos = new Accesos(req.body.codUsuario, req.body.correo, req.body.clave, req.body.uuid);
        ServicesAccessupdate.updateAccess(objTemporal, res);
    }
}
const controllerAccessUpdate=new ControllerAccessUpdate();
export default controllerAccessUpdate;

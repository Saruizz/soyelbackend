import { Request, Response } from "express";
import Accesos from "../model/Accesos";
import ServiceAccessDelete from "../service/ServiceAccessDelete";

class ControllerAccessDelete extends ServiceAccessDelete {
    public delete(req:Request, res:Response):void{
        const objTemporal: Accesos = new Accesos(parseInt(req.params.codUsuario),"","","");
        ServiceAccessDelete.deleteAccess(objTemporal, res);
    }
}
const controllerAccessDelete=new ControllerAccessDelete();
export default controllerAccessDelete;
import { Request, Response } from "express";
import ServiceDeleteRelRolFunctionality from "../services/ServiceDeleteRelRolFunctionality";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";

class ControllerDeleteRelRolFunctionality extends ServiceDeleteRelRolFunctionality{
    public delete(req:Request,res:Response){
        const obj:Rel_rol_funcionalidad = new Rel_rol_funcionalidad(
            Number(req.params.cod_rol),
            Number(req.params.cod_funcionalidad)
        );
        ServiceDeleteRelRolFunctionality.delete(obj,res);
    }
}
const controllerDeleteRelRolFunctionality = new ControllerDeleteRelRolFunctionality();
export default controllerDeleteRelRolFunctionality;
import { Request, Response } from "express";
import Rel_rol_funcionalidad from "../model/Rel_rol_funcionalidad";
import ServiceCreateRelRolFunctionality from "../services/ServiceCreateRelRolFunctionality";

class ControllerCreateRelRolFunctionality extends ServiceCreateRelRolFunctionality{
    public create(req:Request,res:Response){
        const obj:Rel_rol_funcionalidad = new Rel_rol_funcionalidad(
            req.body.codRol,
            req.body.codFunctionality
        );
        ServiceCreateRelRolFunctionality.create(obj,res);
    }
}

const controllerCreateRelRolFunctionality = new ControllerCreateRelRolFunctionality();
export default controllerCreateRelRolFunctionality;

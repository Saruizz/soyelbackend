import { Request, Response } from "express";
import ServiceGetRelRolFunctionality from "../services/ServiceGetRelRolFunctionality";

class ControllerGetRelRolFunctionality extends ServiceGetRelRolFunctionality{
    public getAll(req:Request,res:Response){
        ServiceGetRelRolFunctionality.getAll(res);
    }
}
const controllerGetRelRolFunctionality = new ControllerGetRelRolFunctionality();
export default controllerGetRelRolFunctionality;

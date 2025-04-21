import { Request, Response } from "express";
import ServiceFunctionalityCreate from "../services/ServiceFunctonalityCreate";
import Functionality from "../model/Functionality";

class ControllerFunctionalityCreate extends ServiceFunctionalityCreate{
    public create(req:Request, res:Response){
        const obj:Functionality = new Functionality(
            0,
            req.body.codPadreFuncionalidad,
            req.body.nombreFuncionalidad,
            req.body.urlFuncionalidad
        ); 
        ServiceFunctionalityCreate.create(obj,res);
    }
}
const controllerFunctionalityCreate = new ControllerFunctionalityCreate();
export default controllerFunctionalityCreate;

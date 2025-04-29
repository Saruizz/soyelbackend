import { Request, Response } from "express";
import ServiceGetAllRelUserFunctional from "../services/ServiceGetAllRelUserFunctional";

class ControllerGetRelUserFunctionality extends ServiceGetAllRelUserFunctional{
    public getAllRelUserFunctionality(req:Request,res:Response){
        ServiceGetAllRelUserFunctional.getAllRelUserFunctionality(res);
    }
}
const controllerGetRelUserFunctionality = new ControllerGetRelUserFunctionality();
export default controllerGetRelUserFunctionality;

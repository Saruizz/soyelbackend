import { Request, Response } from "express";
import ServiceFunctionalityGet from "../services/ServiceFunctionalityGet";

class ControllerFunctionalityGet extends ServiceFunctionalityGet{
    public getAll(req:Request,res:Response){
        ServiceFunctionalityGet.getAll(res);
    }
}
const controllerFunctionalityGet = new ControllerFunctionalityGet();
export default controllerFunctionalityGet;
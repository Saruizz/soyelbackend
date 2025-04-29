import { Request, Response } from "express";
import ServiceAccessGet from "../service/ServiceAccessGet";

class ControllerAccessGet  extends ServiceAccessGet {
    public getAll(req:Request, res:Response):void{
        ServiceAccessGet.getAll(res);
    }
}
const controllerAccessGet=new ControllerAccessGet();
export default controllerAccessGet;
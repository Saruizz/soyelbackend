import ServiceFunctionalityDelete from "../services/ServiceFunctionalityDelete";
import { Request, Response } from "express";

class ControllerFunctionalityDelete extends ServiceFunctionalityDelete{
    public delete(req:Request, res:Response){
        const id = Number(req.params.codFuncionalidad);
        ServiceFunctionalityDelete.delete(id, res);
    }
}
const controllerFunctionalityDelete = new ControllerFunctionalityDelete();
export default controllerFunctionalityDelete;
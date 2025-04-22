import { Request, Response } from "express";
import ServiceGetServiceOther from "../service/ServiceGetServiceOther";

class ControllerGetServiceOther extends ServiceGetServiceOther{
    public async getAllServiceOther(req:Request,res:Response){
        await ServiceGetServiceOther.getAll(res);
    }
    public async getByIdServiceOther(req:Request,res:Response){
        const id = Number(req.params.id);
        await ServiceGetServiceOther.getById(id,res);
    }
}

const controllerGetServiceOther = new ControllerGetServiceOther();
export default controllerGetServiceOther;
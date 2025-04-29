import { Request, Response } from "express";
import ServicesIncomeGet from "../service/ServiceIncomeGet";
import Ingreso from "../model/Ingreso";

class ControllerIncomeGet extends ServicesIncomeGet{
    public getAll(req:Request,res:Response):void{
        ServicesIncomeGet.getIncome(res);
    }
}
const controllerIncomeGet = new ControllerIncomeGet();
export default controllerIncomeGet;
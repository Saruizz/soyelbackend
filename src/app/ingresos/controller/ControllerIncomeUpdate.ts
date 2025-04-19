import { Request, Response } from "express";
import Ingreso from "../model/Ingreso";
import ServiceIncomeUpdate from "../service/ServiceIncomeUpdate";

class ControllerIncomeUpdate extends ServiceIncomeUpdate{
    public async updateIncome(req: Request, res: Response): Promise<void> {
        const obj: Ingreso = new Ingreso(
            req.body.codUsuario,
            req.body.fechaIngreso,
            req.body.horaIngreso,
            req.body.codIngreso
        );
        await ServiceIncomeUpdate.updateIncome(obj, res);
    }
}

const controllerIncomeUpdate = new ControllerIncomeUpdate();
export default controllerIncomeUpdate;
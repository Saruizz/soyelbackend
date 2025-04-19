import { Request, Response } from "express";
import ServicesIncomeAdd from "../service/ServicesIncomeAdd";
import Ingreso from "../model/Ingreso";

class ControllerIncomeAdd extends ServicesIncomeAdd {
    async processAddIncome(req: Request, res: Response): Promise<void> {
        const obj = new Ingreso(
            req.body.codUsuario,
            req.body.fechaIngreso,
            req.body.horaIngreso
        );
        await ServicesIncomeAdd.addIncome(obj, res);
    }
}

const controllerIncomeAdd = new ControllerIncomeAdd();
export default controllerIncomeAdd;
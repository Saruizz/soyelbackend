import { Request, Response } from "express";
import ServiceIncomeDelete from "../service/ServiceIncomeDelete";

class ControllerIncomeDelete extends ServiceIncomeDelete {
    public async deleteIncome(req: Request, res: Response): Promise<void> {
        const obj = {
            codIngreso: req.params.codIngreso
        };
        await ServiceIncomeDelete.deleteIncome(obj, res);
    }
}
const controllerIncomeDelete = new ControllerIncomeDelete();
export default controllerIncomeDelete;
    
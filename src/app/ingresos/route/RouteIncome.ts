import { Router } from "express";
import controllerIncomeAdd from "../controller/ControllerIncomeAdd";
import validarDatos from "../../../middleware/ValidarDatos";
import { datosIncomeCreate, datosIncomeDelete, datosIncomeUpdate } from "../../../config/domain/ValidatorIncome";
import controllerIncomeGet from "../controller/ControllerIncomeGet";
import controllerIncomeDelete from "../controller/ControllerIncomeDelete";
import controllerIncomeUpdate from "../controller/ControllerIncomeUpdate";

class RouteIncome{
    public routeincomeApi:Router;

    constructor(){
        this.routeincomeApi = Router();
        this.routeincomeApi.post("/add",validarDatos.ahora,datosIncomeCreate,controllerIncomeAdd.processAddIncome)
        this.routeincomeApi.get("/get",validarDatos.ahora, controllerIncomeGet.getAll);
        this.routeincomeApi.delete("/delete/:codIngreso",validarDatos.ahora, datosIncomeDelete, controllerIncomeDelete.deleteIncome);
        this.routeincomeApi.put("/update",validarDatos.ahora, datosIncomeUpdate, controllerIncomeUpdate.updateIncome);
    }
}

const routeIncome = new RouteIncome();
export default routeIncome;

import { Router } from "express";
import controllerFunctionalityGet from "../controllers/ControllerFunctionalityGet";
import validarDatos from "../../../middleware/ValidarDatos";
import { datosFunctionalityCreate, datosFunctionalityDelete, datosFunctionalityUpdate } from "../../../config/domain/ValidarFunctionality";
import controllerFunctionalityCreate from "../controllers/ControllerFunctionalityCreate";
import controllerFunctionalityDelete from "../controllers/ControllerFunctionalityDelete";
import controllerFunctionalityUpdate from "../controllers/ControllerFunctionalityUpdate";

class RouteFunctionality {
  public routeFunctionalityApi: Router;

  constructor() {
    this.routeFunctionalityApi = Router();
    this.routeFunctionalityApi.get("/getAll", controllerFunctionalityGet.getAll,validarDatos.ahora);
    this.routeFunctionalityApi.post("/create", datosFunctionalityCreate, controllerFunctionalityCreate.create, validarDatos.ahora);
    this.routeFunctionalityApi.put("/update", datosFunctionalityUpdate, controllerFunctionalityUpdate.update, validarDatos.ahora);
    this.routeFunctionalityApi.delete("/delete/:codFuncionalidad",datosFunctionalityDelete, controllerFunctionalityDelete.delete, validarDatos.ahora );
  }
};
const routeFunctionality = new RouteFunctionality();
export default routeFunctionality.routeFunctionalityApi;

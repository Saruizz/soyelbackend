import { Router } from "express";
import controllerGetRelRolFunctionality from "../controllers/ControllerGetRelRolFunctionality";
import controllerCreateRelRolFunctionality from "../controllers/ControllerCreateRelRolFunctionality";
import validarDatos from "../../../middleware/ValidarDatos";
import { datosRelRolFunctionalityCreate } from "../../../config/domain/ValidatorRelRolFunctionality";
import controllerDeleteRelRolFunctionality from "../controllers/ControllerDeleteRelRolFunctionality";

class RouteRelRolFunctionality {
  public rutaRelRolFunctionalityApi: Router;

  constructor() {
    this.rutaRelRolFunctionalityApi = Router();
    this.rutaRelRolFunctionalityApi.get(
      "/getall",
      controllerGetRelRolFunctionality.getAll
    );
    this.rutaRelRolFunctionalityApi.post(
      "/add",
      datosRelRolFunctionalityCreate,
      controllerCreateRelRolFunctionality.create,
      validarDatos.ahora
    );
    this.rutaRelRolFunctionalityApi.delete(
      "/delete",
      datosRelRolFunctionalityCreate,
      controllerDeleteRelRolFunctionality.delete,
      validarDatos.ahora
    );
  }
}
const routeRelRolFunctionality = new RouteRelRolFunctionality().rutaRelRolFunctionalityApi;
export default routeRelRolFunctionality;

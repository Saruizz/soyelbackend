import { Router } from "express";
import controllerGetRelUserFunctionality from "../controllers/ControllerGetRelUserFunctionality";
import validarDatos from "../../../middleware/ValidarDatos";
import controllerCreateRelRolFunctionality from "../../rel_rol_functionalidad/controllers/ControllerCreateRelRolFunctionality";
import { datosRelUserFunctionalityCreate, datosRelUserFunctionalityDelete } from "../../../config/domain/ValidatorRelUserFunctionality";
import controllerDeleteRelRolFunctionality from "../../rel_rol_functionalidad/controllers/ControllerDeleteRelRolFunctionality";

class RouteRelUserFunctionality {
    public RouteApi:Router;
    constructor(){
        this.RouteApi = Router();
        this.RouteApi.get("/getAll",controllerGetRelUserFunctionality.getAllRelUserFunctionality,validarDatos.ahora);
        this.RouteApi.post("/create",datosRelUserFunctionalityCreate,controllerCreateRelRolFunctionality.create,validarDatos.ahora);
        this.RouteApi.delete("/delete",datosRelUserFunctionalityDelete,controllerDeleteRelRolFunctionality.delete,validarDatos.ahora);
    }
}
const routeRelUserFunctionality = new RouteRelUserFunctionality();
export default routeRelUserFunctionality.RouteApi;

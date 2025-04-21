import { Router } from "express";
import controllerAccesCreate from "../controller/ControllerAccesCreate";
import controllerAccessGet from "../controller/ControllerAccessGet";
import { datosAccessCreate, datosAccessDelete, datosAccessUpdate } from "../../../config/domain/ValidatorAccess";
import validarDatos from "../../../middleware/ValidarDatos";
import controllerAccessUpdate from "../controller/ControllerAccessUpdate";
import controllerAccessDelete from "../controller/ControllerAccessDelete";

class RouteAccess {
    public routeAccessApi: Router;

    constructor(){
        this.routeAccessApi = Router();
        this.routeAccessApi.get("/all", controllerAccessGet.getAll);
        this.routeAccessApi.post("/create", datosAccessCreate,validarDatos.ahora, controllerAccesCreate.create);
        this.routeAccessApi.put("/update", datosAccessUpdate,validarDatos.ahora, controllerAccessUpdate.update);
        this.routeAccessApi.delete("/delete/:codUsuario", datosAccessDelete,controllerAccessDelete.delete);
    }
}
const routeAccess=new RouteAccess().routeAccessApi;
export default routeAccess;
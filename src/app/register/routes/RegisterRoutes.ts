import { Router } from "express"
import { datosRegisterCreate } from "../../../config/domain/ValidatorRegister";
import validarDatos from "../../../middleware/ValidarDatos";
import registerControllerCreate from "../controllers/registerControllerCreate";

class RegisterRoutes {
    public routeRegisterApi: Router;

    constructor(){
        this.routeRegisterApi = Router();
        this.routeRegisterApi.post("/create", datosRegisterCreate,validarDatos.ahora, registerControllerCreate.createRegister);
    }
}

const registerRoutes = new RegisterRoutes().routeRegisterApi;
export default registerRoutes;

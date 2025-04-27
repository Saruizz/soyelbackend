import { Request, Response } from "express";
import ServiceCreateRelUserFunctionality from "../services/ServiceCreateRelUserFunctionality";
import RelUserFunctionality from "../model/RelUserFunctionality";

class ControllerCreateRelUserFunctionality extends ServiceCreateRelUserFunctionality {
    public createRelUserFunctionality(req:Request,res:Response){
        const obj:RelUserFunctionality = new RelUserFunctionality(
            Number(req.params.codUsuario),
            Number(req.params.codFuncionalidad)
        );
        ServiceCreateRelUserFunctionality.create(obj,res);
    }
}
const controllerCreateRelUserFunctionality = new ControllerCreateRelUserFunctionality();
export default controllerCreateRelUserFunctionality;
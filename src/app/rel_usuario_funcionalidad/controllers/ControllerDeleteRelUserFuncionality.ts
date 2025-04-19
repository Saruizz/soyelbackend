import { Request, Response } from "express";
import RelUserFunctionality from "../model/RelUserFunctionality";
import ServiceDeleteRelUserFunctionality from "../services/ServiceDeleteUserFunctionality";

class ControllerDeleteRelUserFuncionality extends ServiceDeleteRelUserFunctionality{
    public deleteRelUserFunctionality(req:Request,res:Response){
        const obj:RelUserFunctionality = new RelUserFunctionality(
            Number(req.params.codUsuario),
            Number(req.params.codFuncionalidad)
        );
        ServiceDeleteRelUserFunctionality.delete(obj,res);
    }
}

const controllerDeleteRelUserFuncionality = new ControllerDeleteRelUserFuncionality();
export default controllerDeleteRelUserFuncionality;
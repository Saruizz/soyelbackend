import { Router } from "express";
import controllerUserGet from "../controller/ControllerUserGet";
import controllerUserDelete from "../controller/ControllerUserDelete,";
import validarDatos from "../../../middleware/ValidarDatos";
import controllerUserCreate from "../controller/ControllerUserCreate";
import controllerUserUpdate from "../controller/ControllerUserUpdate";
import { datosUserCreate, datosUserDelete, datosUserUpdate } from "../../../config/domain/ValidationUser";

class RutaUser{
    public rutalRolApi:Router;

    constructor(){
        this.rutalRolApi=Router();
        //Aqui el endpoint siempre ira en minuscula y ingles en este caso gettall para obtener todos los roles
        this.rutalRolApi.get("/get", controllerUserGet.getUsers);
        this.rutalRolApi.get("/get/:codUsuario", controllerUserGet.getUserById);
        this.rutalRolApi.post("/add",datosUserCreate,controllerUserCreate.createUser,validarDatos.ahora);
        this.rutalRolApi.delete("/delete/:codUsuario",datosUserDelete,controllerUserDelete.deleteUser,validarDatos.ahora);
        this.rutalRolApi.put('/update',datosUserUpdate,controllerUserUpdate.updateUser,validarDatos.ahora)
    }
}

//el api son los endpoint

const rutasUser=new RutaUser().rutalRolApi;
export default rutasUser;
import { Request, Response } from "express";
import ServiceUserGet from "../service/ServiceUserGet";

class ControllerUserGet extends ServiceUserGet {
    public async getUsers(req: Request, res: Response){
        await ServiceUserGet.obtenerUsuarios(res);
    }
}
const controllerUserGet = new ControllerUserGet();
export default controllerUserGet;
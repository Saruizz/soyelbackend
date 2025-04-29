import { Request, Response } from "express";
import ServiceUserGet from "../service/ServiceUserGet";

class ControllerUserGet extends ServiceUserGet {
    public async getUsers(req: Request, res: Response): Promise<any> {
        await ServiceUserGet.obtenerUsuarios(res);
    }
    public async getUserById(req: Request, res: Response): Promise<any> {
        const {codUsuario}:any = Number(req.params.codUsuario);
        await ServiceUserGet.getUserById(codUsuario, res);
    }
}
const controllerUserGet = new ControllerUserGet();
export default controllerUserGet;
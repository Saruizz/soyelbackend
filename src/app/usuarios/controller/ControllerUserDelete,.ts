import { Request, Response } from "express";
import ServiceUserDelete from "../service/ServiceUserDelete";

class ControllerUserDelete extends ServiceUserDelete{
    public async deleteUser(req:Request, res: Response): Promise<any> {
        const {codUsuario} = req.params;
        await ServiceUserDelete.eliminarUsuario(Number(codUsuario), res);
    }
}
const controllerUserDelete = new ControllerUserDelete();
export default controllerUserDelete;
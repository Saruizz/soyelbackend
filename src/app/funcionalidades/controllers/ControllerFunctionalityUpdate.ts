import { Request, Response } from "express";
import Functionality from "../model/Functionality";
import ServiceFunctionalityUpdate from "../services/ServiceFunctionalityUpdate";

class ControllerFunctionalityUpdate extends ServiceFunctionalityUpdate {
  public update(req: Request, res: Response) {
    const obj = new Functionality(
      req.body.codFuncionalidad,
      req.body.codPadreFuncionalidad,
      req.body.nombreFuncionalidad,
      req.body.urlFuncionalidad
    );
    ServiceFunctionalityUpdate.update(obj, res);
  }
}
const controllerFunctionalityUpdate = new ControllerFunctionalityUpdate();
export default controllerFunctionalityUpdate;

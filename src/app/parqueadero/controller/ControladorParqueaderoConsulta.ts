import { Request, Response} from "express";
import ServicioParqueaderoConsulta from "../service/ServicioParqueaderoConsulta";

class ControladorParqueaderoConsulta extends ServicioParqueaderoConsulta {

    public llamarObtenerTodos (req: Request, res: Response): void {
        ServicioParqueaderoConsulta.obtenerTodos(res);
    }
}

const controladorParqueaderoConsulta = new ControladorParqueaderoConsulta();
export default controladorParqueaderoConsulta;
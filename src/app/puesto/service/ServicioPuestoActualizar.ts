import {Request, Response} from 'express';
import pool from '../../../config/connection/dbConnection';
import {SQL_PUESTO} from '../repository/sql_puesto';
import Puesto from '../model/Puesto';
import TipoVehiculo from '../../tipo_vehiculo/model/TipoVehiculo';

class ServicioPuestoActualizar{
    protected static async actualizarPuesto(req: Request, res: Response): Promise<any> {
        const {codPuesto, codParqueadero, codTipoVehiculo, detallePuesto} = req.body;

        try {
            const existePuesto = await pool.oneOrNone(SQL_PUESTO.HOW_MANY, [ codPuesto]);

            if (existePuesto.cantidad === '0') {
                return res.status(404).json({
                    respuesta: 'El puesto que intenta actualizar no existe',
                });
            }

            const puestoActualizado = await pool.one(SQL_PUESTO.UPDATE, [ codPuesto, codParqueadero, codTipoVehiculo, detallePuesto]);

            const puesto = new Puesto( puestoActualizado.codpuesto, puestoActualizado.codparqueadero, puestoActualizado.codTipoVehiculo, puestoActualizado.detallePuesto);

            res.status(200).json({
                respuesta: 'Puesto actualizado correctamente',
                puestoActualizado: puesto,
            });
        
        } catch (miError) {
            console.log(miError);
            res.status(500).json({
                respuesta: 'Error interno al actualizar el puesto',
            });
        }
    }   

}
export default ServicioPuestoActualizar;
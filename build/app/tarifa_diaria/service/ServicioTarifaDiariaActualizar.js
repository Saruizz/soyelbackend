"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConnection_1 = __importDefault(require("../../../config/connection/dbConnection"));
const sql_tarifa_diaria_1 = require("../repository/sql_tarifa_diaria");
const TarifaDiaria_1 = __importDefault(require("../model/TarifaDiaria"));
class ServicioTarifaDiariaActualizar {
    static actualizarTarifaDiaria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { codParqueadero, codTipoVehiculo, valorTarifaDiaria } = req.body;
            try {
                const existeTarifa = yield dbConnection_1.default.oneOrNone(sql_tarifa_diaria_1.SQL_TARIFA_DIARIA.HOW_MANY, [codParqueadero, codTipoVehiculo]);
                if (existeTarifa.cantidad === "0") {
                    return res.status(404).json({
                        respuesta: "La tarifa diaria que intenta actualizar no existe",
                    });
                }
                const tarifaActualizada = yield dbConnection_1.default.one(sql_tarifa_diaria_1.SQL_TARIFA_DIARIA.UPDATE, [codParqueadero, codTipoVehiculo, valorTarifaDiaria]);
                const tarifaDiaria = new TarifaDiaria_1.default(tarifaActualizada.codparqueadero, tarifaActualizada.codtipovehiculo, tarifaActualizada.valortarifadiaria);
                res.status(200).json({
                    respuesta: "Tarifa diaria actualizada correctamente",
                    tarifaActualizada: tarifaActualizada
                });
            }
            catch (miError) {
                console.log(miError);
                res.status(500).json({
                    respuesta: "Error interno al actualizar la tarifa diaria"
                });
            }
        });
    }
}
exports.default = ServicioTarifaDiariaActualizar;

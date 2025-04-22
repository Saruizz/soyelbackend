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
const dbConnetions_1 = __importDefault(require("../../../config/connection/dbConnetions"));
const sql_ingreso_1 = __importDefault(require("../repository/sql_ingreso"));
class ServicesIncomeAdd {
    static addIncome(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnetions_1.default
                .task((consulta) => __awaiter(this, void 0, void 0, function* () {
                let caso = 1;
                const user = yield consulta.oneOrNone(sql_ingreso_1.default.GETUSERBYID, [
                    obj.codUsuario,
                ]);
                if (!user) {
                    caso = 2;
                }
                if (caso === 1) {
                    yield consulta.oneOrNone(sql_ingreso_1.default.INSERT, [
                        obj.codUsuario,
                        obj.fechaIngreso,
                        obj.horaIngreso,
                    ]);
                }
                return { caso, obj };
            }))
                .then(({ caso, obj }) => {
                switch (caso) {
                    case 1:
                        res
                            .status(200)
                            .json({ respuesta: "Ingreso agregado correctamente", detalle: obj });
                        break;
                    case 2:
                        res
                            .status(400)
                            .json({ respuesta: "El usuario no existe en la base de datos" });
                        break;
                }
            })
                .catch((error) => {
                console.log(error);
                res
                    .status(400)
                    .json({
                    respuesta: "Error al agregar el ingreso",
                    error: error.message,
                });
            });
        });
    }
}
exports.default = ServicesIncomeAdd;

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
class ServiceCreateRelRolFunctionality {
    static create(obj, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield dbConnection_1.default.task((consulta) => __awaiter(this, void 0, void 0, function* () {
                yield consulta.query('INSERT INTO rel_rol_funcionalidad (cod_rol, cod_funcionalidad) VALUES (?, ?)', [obj.cod_rol, obj.cod_funcionalidad]);
            })).then(() => {
                res.status(200).json({
                    message: 'Relacion rol funcionalidad creada exitosamente'
                });
            }).catch((error) => {
                console.log(error);
                res.status(400).json({
                    message: 'Error al crear la relacion rol funcionalidad',
                });
            });
        });
    }
}
exports.default = ServiceCreateRelRolFunctionality;

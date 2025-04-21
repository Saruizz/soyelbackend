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
const Ingreso_1 = __importDefault(require("../model/Ingreso"));
const ServiceIncomeUpdate_1 = __importDefault(require("../service/ServiceIncomeUpdate"));
class ControllerIncomeUpdate extends ServiceIncomeUpdate_1.default {
    updateIncome(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const obj = new Ingreso_1.default(req.body.codUsuario, req.body.fechaIngreso, req.body.horaIngreso, req.body.codIngreso);
            yield ServiceIncomeUpdate_1.default.updateIncome(obj, res);
        });
    }
}
const controllerIncomeUpdate = new ControllerIncomeUpdate();
exports.default = controllerIncomeUpdate;

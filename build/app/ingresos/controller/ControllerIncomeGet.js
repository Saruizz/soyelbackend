"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ServiceIncomeGet_1 = __importDefault(require("../service/ServiceIncomeGet"));
class ControllerIncomeGet extends ServiceIncomeGet_1.default {
    getAll(req, res) {
        ServiceIncomeGet_1.default.getIncome(res);
    }
}
const controllerIncomeGet = new ControllerIncomeGet();
exports.default = controllerIncomeGet;

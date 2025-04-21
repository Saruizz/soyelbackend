"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerIncomeAdd_1 = __importDefault(require("../controller/ControllerIncomeAdd"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ValidatorIncome_1 = require("../../../config/domain/ValidatorIncome");
const ControllerIncomeGet_1 = __importDefault(require("../controller/ControllerIncomeGet"));
const ControllerIncomeDelete_1 = __importDefault(require("../controller/ControllerIncomeDelete"));
const ControllerIncomeUpdate_1 = __importDefault(require("../controller/ControllerIncomeUpdate"));
class RouteIncome {
    constructor() {
        this.routeincomeApi = (0, express_1.Router)();
        this.routeincomeApi.post("/add", ValidarDatos_1.default.ahora, ValidatorIncome_1.datosIncomeCreate, ControllerIncomeAdd_1.default.processAddIncome);
        this.routeincomeApi.get("/get", ValidarDatos_1.default.ahora, ControllerIncomeGet_1.default.getAll);
        this.routeincomeApi.delete("/delete/:codIngreso", ValidarDatos_1.default.ahora, ValidatorIncome_1.datosIncomeDelete, ControllerIncomeDelete_1.default.deleteIncome);
        this.routeincomeApi.put("/update", ValidarDatos_1.default.ahora, ValidatorIncome_1.datosIncomeUpdate, ControllerIncomeUpdate_1.default.updateIncome);
    }
}
const routeIncome = new RouteIncome().routeincomeApi;
exports.default = routeIncome;

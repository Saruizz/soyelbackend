"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerFunctionalityGet_1 = __importDefault(require("../controllers/ControllerFunctionalityGet"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ValidarFunctionality_1 = require("../../../config/domain/ValidarFunctionality");
const ControllerFunctionalityCreate_1 = __importDefault(require("../controllers/ControllerFunctionalityCreate"));
const ControllerFunctionalityDelete_1 = __importDefault(require("../controllers/ControllerFunctionalityDelete"));
const ControllerFunctionalityUpdate_1 = __importDefault(require("../controllers/ControllerFunctionalityUpdate"));
class RouteFunctionality {
    constructor() {
        this.routeFunctionalityApi = (0, express_1.Router)();
        this.routeFunctionalityApi.get("/getAll", ControllerFunctionalityGet_1.default.getAll, ValidarDatos_1.default.ahora);
        this.routeFunctionalityApi.post("/create", ValidarFunctionality_1.datosFunctionalityCreate, ControllerFunctionalityCreate_1.default.create, ValidarDatos_1.default.ahora);
        this.routeFunctionalityApi.put("/update", ValidarFunctionality_1.datosFunctionalityUpdate, ControllerFunctionalityUpdate_1.default.update, ValidarDatos_1.default.ahora);
        this.routeFunctionalityApi.delete("/delete/:codFuncionalidad", ValidarFunctionality_1.datosFunctionalityDelete, ControllerFunctionalityDelete_1.default.delete, ValidarDatos_1.default.ahora);
    }
}
;
const routeFunctionality = new RouteFunctionality();
exports.default = routeFunctionality.routeFunctionalityApi;

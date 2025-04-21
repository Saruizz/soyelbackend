"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerGetRelRolFunctionality_1 = __importDefault(require("../controllers/ControllerGetRelRolFunctionality"));
const ControllerCreateRelRolFunctionality_1 = __importDefault(require("../controllers/ControllerCreateRelRolFunctionality"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ValidatorRelRolFunctionality_1 = require("../../../config/domain/ValidatorRelRolFunctionality");
const ControllerDeleteRelRolFunctionality_1 = __importDefault(require("../controllers/ControllerDeleteRelRolFunctionality"));
class RouteRelRolFunctionality {
    constructor() {
        this.rutaRelRolFunctionalityApi = (0, express_1.Router)();
        this.rutaRelRolFunctionalityApi.get("/getall", ControllerGetRelRolFunctionality_1.default.getAll);
        this.rutaRelRolFunctionalityApi.post("/add", ValidatorRelRolFunctionality_1.datosRelRolFunctionalityCreate, ControllerCreateRelRolFunctionality_1.default.create, ValidarDatos_1.default.ahora);
        this.rutaRelRolFunctionalityApi.delete("/delete", ValidatorRelRolFunctionality_1.datosRelRolFunctionalityCreate, ControllerDeleteRelRolFunctionality_1.default.delete, ValidarDatos_1.default.ahora);
    }
}
const routeRelRolFunctionality = new RouteRelRolFunctionality().rutaRelRolFunctionalityApi;
exports.default = routeRelRolFunctionality;

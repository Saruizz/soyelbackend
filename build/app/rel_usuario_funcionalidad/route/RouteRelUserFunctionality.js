"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerGetRelUserFunctionality_1 = __importDefault(require("../controllers/ControllerGetRelUserFunctionality"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControllerCreateRelRolFunctionality_1 = __importDefault(require("../../rel_rol_functionalidad/controllers/ControllerCreateRelRolFunctionality"));
const ValidatorRelUserFunctionality_1 = require("../../../config/domain/ValidatorRelUserFunctionality");
const ControllerDeleteRelRolFunctionality_1 = __importDefault(require("../../rel_rol_functionalidad/controllers/ControllerDeleteRelRolFunctionality"));
class RouteRelUserFunctionality {
    constructor() {
        this.RouteApi = (0, express_1.Router)();
        this.RouteApi.get("/getAll", ControllerGetRelUserFunctionality_1.default.getAllRelUserFunctionality, ValidarDatos_1.default.ahora);
        this.RouteApi.post("/create", ValidatorRelUserFunctionality_1.datosRelUserFunctionalityCreate, ControllerCreateRelRolFunctionality_1.default.create, ValidarDatos_1.default.ahora);
        this.RouteApi.delete("/delete", ValidatorRelUserFunctionality_1.datosRelUserFunctionalityDelete, ControllerDeleteRelRolFunctionality_1.default.delete, ValidarDatos_1.default.ahora);
    }
}
const routeRelUserFunctionality = new RouteRelUserFunctionality().RouteApi;
exports.default = routeRelUserFunctionality;

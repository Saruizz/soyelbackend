"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerAccesCreate_1 = __importDefault(require("../controller/ControllerAccesCreate"));
const ControllerAccessGet_1 = __importDefault(require("../controller/ControllerAccessGet"));
const ValidatorAccess_1 = require("../../../config/domain/ValidatorAccess");
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControllerAccessUpdate_1 = __importDefault(require("../controller/ControllerAccessUpdate"));
const ControllerAccessDelete_1 = __importDefault(require("../controller/ControllerAccessDelete"));
class RouteAccess {
    constructor() {
        this.routeAccessApi = (0, express_1.Router)();
        this.routeAccessApi.get("/all", ControllerAccessGet_1.default.getAll);
        this.routeAccessApi.post("/create", ValidatorAccess_1.datosAccessCreate, ValidarDatos_1.default.ahora, ControllerAccesCreate_1.default.create);
        this.routeAccessApi.put("/update", ValidatorAccess_1.datosAccessUpdate, ValidarDatos_1.default.ahora, ControllerAccessUpdate_1.default.update);
        this.routeAccessApi.delete("/delete/:codUsuario", ValidatorAccess_1.datosAccessDelete, ControllerAccessDelete_1.default.delete);
    }
}
const routeAccess = new RouteAccess().routeAccessApi;
exports.default = routeAccess;

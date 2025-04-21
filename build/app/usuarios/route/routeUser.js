"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ControllerUserGet_1 = __importDefault(require("../controller/ControllerUserGet"));
const ControllerUserDelete_1 = __importDefault(require("../controller/ControllerUserDelete,"));
const ValidarDatos_1 = __importDefault(require("../../../middleware/ValidarDatos"));
const ControllerUserCreate_1 = __importDefault(require("../controller/ControllerUserCreate"));
const ControllerUserUpdate_1 = __importDefault(require("../controller/ControllerUserUpdate"));
const ValidationUser_1 = require("../../../config/domain/ValidationUser");
class RutaUser {
    constructor() {
        this.rutalRolApi = (0, express_1.Router)();
        //Aqui el endpoint siempre ira en minuscula y ingles en este caso gettall para obtener todos los roles
        this.rutalRolApi.get("/get", ControllerUserGet_1.default.getUsers);
        this.rutalRolApi.post("/add", ValidationUser_1.datosUserCreate, ControllerUserCreate_1.default.createUser, ValidarDatos_1.default.ahora);
        this.rutalRolApi.delete("/delete/:codUsuario", ValidationUser_1.datosUserDelete, ControllerUserDelete_1.default.deleteUser, ValidarDatos_1.default.ahora);
        this.rutalRolApi.put('/update', ValidationUser_1.datosUserUpdate, ControllerUserUpdate_1.default.updateUser, ValidarDatos_1.default.ahora);
    }
}
//el api son los endpoint
const rutasUser = new RutaUser().rutalRolApi;
exports.default = rutasUser;

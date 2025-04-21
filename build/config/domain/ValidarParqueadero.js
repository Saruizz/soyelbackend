"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosParqueaderoActualizar = exports.datosParqueaderoBorrar = exports.datosParqueaderoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosParqueaderoCrear = [
    (0, express_validator_1.body)("nombreParqueadero", "Nombre requerido").not().isEmpty(),
    (0, express_validator_1.body)("nombreParqueadero", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("codUbicacion", "Ubicacion requerida").not().isEmpty(),
    (0, express_validator_1.body)("dirParqueadero", "Direccion requerida").not().isEmpty(),
    (0, express_validator_1.body)("telParqueadero", "Telefono requerido").not().isEmpty(),
];
exports.datosParqueaderoBorrar = [
    (0, express_validator_1.param)("codParqueadero", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("codParqueadero", "Maximo 6 caracteres").isLength({ max: 6 }),
];
exports.datosParqueaderoActualizar = [
    (0, express_validator_1.body)("codParqueadero", "Codigo requerido").not().isEmpty(),
    (0, express_validator_1.body)("codParqueadero", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("nombreParqueadero", "Nombre requerido").not().isEmpty(),
    (0, express_validator_1.body)("nombreParqueadero", "Minimo 5 caracteres").isLength({ min: 5 }),
];

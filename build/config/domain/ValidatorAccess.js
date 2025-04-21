"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosAccessUpdate = exports.datosAccessDelete = exports.datosAccessCreate = void 0;
const express_validator_1 = require("express-validator");
exports.datosAccessCreate = [
    (0, express_validator_1.body)("correo", "Correo requerido").not().isEmpty(),
    (0, express_validator_1.body)("correo", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("clave", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("uuid", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("codUsuario", "Debe ser numerico").isInt(),
];
exports.datosAccessDelete = [
    (0, express_validator_1.param)('codUsuario', 'Usuario requerido').not().isEmpty().isInt(),
    (0, express_validator_1.param)('codUsuario', 'Maximo 6 caracteres').isLength({ max: 5 }),
    (0, express_validator_1.param)('codUsuario', 'Debe ser numerico').isInt(),
];
exports.datosAccessUpdate = [
    (0, express_validator_1.body)('codUsuario', 'Usuario requerido').not().isEmpty().isInt(),
    (0, express_validator_1.body)('codUsuario', 'Maximo 6 caracteres').isLength({ max: 5 }),
    (0, express_validator_1.body)("correo", "Correo requerido").not().isEmpty(),
    (0, express_validator_1.body)("correo", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("clave", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("uuid", "Minimo 5 caracteres").isLength({ min: 5 }),
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosIncomeUpdate = exports.datosIncomeDelete = exports.datosIncomeCreate = void 0;
const express_validator_1 = require("express-validator");
exports.datosIncomeCreate = [
    (0, express_validator_1.body)("codUsuario", "Usuario requerido").not().isEmpty().isInt(),
    (0, express_validator_1.body)("codUsuario", "Maximo 6 caracteres").isLength({ max: 5 }),
    (0, express_validator_1.body)("fechaIngreso", "Fecha requerida").not().isEmpty(),
    (0, express_validator_1.body)("horaIngreso", "Hora requerida").not().isEmpty(),
];
exports.datosIncomeDelete = [
    (0, express_validator_1.param)('codIngreso', 'Usuario requerido').not().isEmpty().isInt(),
    (0, express_validator_1.param)('codIngreso', 'Maximo 6 caracteres').isLength({ max: 5 }),
];
exports.datosIncomeUpdate = [
    (0, express_validator_1.body)('codUsuario', 'Usuario requerido').not().isEmpty().isInt(),
    (0, express_validator_1.body)('codUsuario', 'Maximo 6 caracteres').isLength({ max: 5 }),
    (0, express_validator_1.body)("fechaIngreso", "Fecha requerida").not().isEmpty(),
    (0, express_validator_1.body)("horaIngreso", "Hora requerida").not().isEmpty(),
];

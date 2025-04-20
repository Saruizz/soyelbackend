"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosRelTurnoUsuario = void 0;
const express_validator_1 = require("express-validator");
exports.datosRelTurnoUsuario = [
    (0, express_validator_1.body)("cod_turno").isInt().withMessage("El código del turno debe ser un número entero"),
    (0, express_validator_1.body)("cod_usuario").isInt().withMessage("El código del usuario debe ser un número entero")
];

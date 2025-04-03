"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosRolActualizar = exports.datosRolBorrar = exports.datosRolCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosRolCrear = [
    (0, express_validator_1.body)("nombreRol", "El nombre del rol es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol debe tener al menos 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol solo puede contener letras y espacios").matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol no puede exceder 50 caracteres").isLength({ max: 50 }),
];
exports.datosRolBorrar = [
    (0, express_validator_1.param)("codRol", "El código de rol debe ser un número entero").isInt({
        min: 1,
    }),
    (0, express_validator_1.param)("codRol", "El código de rol no puede tener más de 6 dígitos").isLength({
        max: 6,
    }),
];
exports.datosRolActualizar = [
    (0, express_validator_1.body)("codRol", "El código de rol es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("codRol", "El código de rol debe ser un número entero").isInt({
        min: 1,
    }),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol es obligatorio").trim().not().isEmpty(),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol debe tener al menos 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol solo puede contener letras y espacios").matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    (0, express_validator_1.body)("nombreRol", "El nombre del rol no puede exceder 50 caracteres").isLength({ max: 50 }),
];

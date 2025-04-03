"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosHistorialIngresos = exports.datosCerrarSesion = exports.datosValidarSesion = exports.datosLogin = void 0;
const express_validator_1 = require("express-validator");
exports.datosLogin = [
    (0, express_validator_1.body)("correoAcceso", "Correo electrónico requerido").not().isEmpty(),
    (0, express_validator_1.body)("correoAcceso", "Debe ingresar un correo electrónico válido").isEmail(),
    (0, express_validator_1.body)("correoAcceso", "El correo debe tener máximo 200 caracteres").isLength({
        max: 200,
    }),
    (0, express_validator_1.body)("claveAcceso", "Contraseña requerida").not().isEmpty(),
    (0, express_validator_1.body)("claveAcceso", "La contraseña debe tener entre 6 y 200 caracteres").isLength({ min: 6, max: 200 }),
];
exports.datosValidarSesion = [
    (0, express_validator_1.body)("codUsuario", "Código de usuario requerido").not().isEmpty(),
    (0, express_validator_1.body)("codUsuario", "Código de usuario debe ser numérico").isInt(),
    (0, express_validator_1.body)("uuidAcceso", "Token de sesión requerido").not().isEmpty(),
    (0, express_validator_1.body)("uuidAcceso", "Token de sesión inválido").isLength({
        min: 10,
        max: 100,
    }),
];
exports.datosCerrarSesion = [
    (0, express_validator_1.body)("codUsuario", "Código de usuario requerido").not().isEmpty(),
    (0, express_validator_1.body)("codUsuario", "Código de usuario debe ser numérico").isInt(),
];
exports.datosHistorialIngresos = [
    (0, express_validator_1.param)("codUsuario", "Código de usuario requerido").not().isEmpty(),
    (0, express_validator_1.param)("codUsuario", "Código de usuario debe ser numérico").isInt(),
];

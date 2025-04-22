"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosRelUserFunctionalityDelete = exports.datosRelUserFunctionalityCreate = void 0;
const express_validator_1 = require("express-validator");
exports.datosRelUserFunctionalityCreate = [
    (0, express_validator_1.body)("codUsuario", "Código de usuario requerido").not().isEmpty(),
    (0, express_validator_1.body)("codUsuario", "Código de usuario debe ser numérico").isInt(),
    (0, express_validator_1.body)("codFuncionalidad", "Código de funcionalidad requerido").not().isEmpty(),
    (0, express_validator_1.body)("codFuncionalidad", "Código de funcionalidad debe ser numérico").isInt()
];
exports.datosRelUserFunctionalityDelete = [
    (0, express_validator_1.body)("codUsuario", "Código de usuario requerido").not().isEmpty(),
    (0, express_validator_1.body)("codUsuario", "Código de usuario debe ser numérico").isInt(),
    (0, express_validator_1.body)("codFuncionalidad", "Código de funcionalidad requerido").not().isEmpty(),
    (0, express_validator_1.body)("codFuncionalidad", "Código de funcionalidad debe ser numérico").isInt()
];

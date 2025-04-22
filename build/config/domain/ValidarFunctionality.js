"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosFunctionalityUpdate = exports.datosFunctionalityDelete = exports.datosFunctionalityCreate = void 0;
const express_validator_1 = require("express-validator");
exports.datosFunctionalityCreate = [
    (0, express_validator_1.body)("codFuncionalidad", "Código de funcionalidad requerido").not().isEmpty(),
    (0, express_validator_1.body)("codFuncionalidad", "Código de funcionalidad debe ser numérico").isInt(),
    (0, express_validator_1.body)('nombreFuncionalidad', 'Nombre de funcionalidad requerido').not().isEmpty(),
    (0, express_validator_1.body)('nombreFuncionalidad', 'Nombre de funcionalidad debe ser alfanumérico').isAlphanumeric(),
    (0, express_validator_1.body)('urlFuncionalidad', 'URL de funcionalidad requerida').not().isEmpty(),
    (0, express_validator_1.body)('urlFuncionalidad', 'URL de funcionalidad debe ser una URL válida').not().isEmpty()
];
exports.datosFunctionalityDelete = [
    (0, express_validator_1.body)('codFuncionalidad', 'Código de funcionalidad requerido').not().isEmpty(),
    (0, express_validator_1.body)('codFuncionalidad', 'Código de funcionalidad debe ser numérico').isInt()
];
exports.datosFunctionalityUpdate = [
    (0, express_validator_1.body)('codFuncionalidad', 'Código de funcionalidad requerido').not().isEmpty(),
    (0, express_validator_1.body)("nombreFuncionalidad", "Nombre de funcionalidad requerido").not().isEmpty(),
    (0, express_validator_1.body)("nombreFuncionalidad", "Nombre de funcionalidad debe ser alfanumérico").isAlphanumeric(),
    (0, express_validator_1.body)("urlFuncionalidad", "URL de funcionalidad requerida").not().isEmpty(),
    (0, express_validator_1.body)("urlFuncionalidad", "URL de funcionalidad debe ser una URL válida").not().isEmpty()
];

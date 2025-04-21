"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosUserUpdate = exports.datosUserDelete = exports.datosUserCreate = void 0;
const express_validator_1 = require("express-validator");
exports.datosUserCreate = [
    (0, express_validator_1.body)('codRol', 'Codigo requerido').not().isEmpty(),
    (0, express_validator_1.body)('codRol', 'Codigo debe ser numerico').isInt(),
    (0, express_validator_1.body)('documentoUsuario', 'Documento requerido').not().isEmpty(),
    (0, express_validator_1.body)('documentoUsuario', 'Minimo 5 caracteres').isLength({ min: 5 }),
    (0, express_validator_1.body)('nombresUsuario', 'Nombres requerido').not().isEmpty(),
    (0, express_validator_1.body)('nombresUsuario', 'Minimo 5 caracteres').isLength({ min: 5 }),
    (0, express_validator_1.body)('apellidosUsuario', 'Apellidos requerido').not().isEmpty(),
    (0, express_validator_1.body)('apellidosUsuario', 'Minimo 5 caracteres').isLength({ min: 5 }),
    (0, express_validator_1.body)('generoUsuario', 'Genero requerido').not().isEmpty(),
    (0, express_validator_1.body)('generoUsuario', 'Minimo 1 caracteres').isLength({ min: 1 }),
    (0, express_validator_1.body)('fechaNacimientoUsuario', 'Fecha de nacimiento requerida').not().isEmpty(),
    (0, express_validator_1.body)('fechaNacimientoUsuario', 'Formato de fecha invalido').isDate(),
    (0, express_validator_1.body)('telefonoUsuario', 'Telefono requerido').not().isEmpty(),
    (0, express_validator_1.body)('telefonoUsuario', 'Minimo 8 caracteres').isLength({ min: 8 }),
];
exports.datosUserDelete = [
    (0, express_validator_1.param)('codUsuario', 'Usuario requerido').isInt(),
    (0, express_validator_1.param)('codUsuario', 'Maximo 6 caracteres').isLength({ max: 5 }),
];
exports.datosUserUpdate = [
    (0, express_validator_1.body)('codUsuario', 'Usuario requerido').not().isEmpty(),
    (0, express_validator_1.body)('codUsuario', 'Usuario debe ser numerico').isInt(),
    (0, express_validator_1.body)('documentoUsuario', 'Documento requerido').trim().not().isEmpty(),
    (0, express_validator_1.body)('documentoUsuario', 'Minimo 5 caracteres').isLength({ min: 5 }),
];

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosUbicacionActualizar = exports.datosUbicacionBorrar = exports.datosUbicacionCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosUbicacionCrear = [
    (0, express_validator_1.body)("nombreUbicacion", "Nombre requerido").not().isEmpty(),
    (0, express_validator_1.body)("nombreUbicacion", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("codExternoUbicacion", "Codigo Externo requerido").not().isEmpty(),
];
exports.datosUbicacionBorrar = [
    (0, express_validator_1.param)("codUbicacion", "Debe ser un numero").isInt(),
    //param("codUbicacion", "Maximo 6 caracteres").isLength({max: 6}),
];
exports.datosUbicacionActualizar = [
    (0, express_validator_1.body)("codUbicacion", "Codigo requerido").not().isEmpty(),
    (0, express_validator_1.body)("codUbicacion", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("codExternoUbicacion", "Codigo Externo requerido").not().isEmpty(),
    (0, express_validator_1.body)("codExternoUbicacion", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("nombreUbicacion", "Nombre requerido").not().isEmpty(),
    (0, express_validator_1.body)("nombreUbicacion", "Minimo 5 caracteres").isLength({ min: 5 }),
];

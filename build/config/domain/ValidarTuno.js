"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosTurnoActualizar = exports.datosTurnoBorrar = exports.datosTurnoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosTurnoCrear = [
    (0, express_validator_1.body)("descripcionTurno", "Nombre requerido").not().isEmpty(),
    (0, express_validator_1.body)("descripcionTurno", "Minimo 5 caracteres").isLength({ min: 5 }),
    (0, express_validator_1.body)("fechaTurno", "Fecha requerida").not().isEmpty(),
    (0, express_validator_1.body)("horaInicioTurno", "Hora inicial requerida").not().isEmpty(),
    (0, express_validator_1.body)("horaFinTurno", "Hora final requerida").not().isEmpty(),
];
exports.datosTurnoBorrar = [
    (0, express_validator_1.param)("codTurno", "Debe ser un numero").isInt(),
    (0, express_validator_1.param)("codTurno", "Maximo 6 caracteres").isLength({ max: 6 }),
];
exports.datosTurnoActualizar = [
    (0, express_validator_1.body)("codTurno", "Codigo requerido").not().isEmpty(),
    (0, express_validator_1.body)("codTurno", "Debe ser un numero").isInt(),
    (0, express_validator_1.body)("descripcionTurno", "Nombre requerido").not().isEmpty(),
    (0, express_validator_1.body)("descripcionTurno", "Minimo 5 caracteres").isLength({ min: 5 }),
];

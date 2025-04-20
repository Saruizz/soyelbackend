"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosTurnoActualizar = exports.datosTurnoBorrar = exports.datosTurnoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosTurnoCrear = [
    (0, express_validator_1.body)("cod_parqueadero", "Código de parqueadero debe ser un número").optional().isInt(),
    (0, express_validator_1.body)("descripcion_turno", "Descripción requerida").not().isEmpty(),
    (0, express_validator_1.body)("descripcion_turno", "Máximo 200 caracteres").isLength({ max: 200 }),
    (0, express_validator_1.body)("fecha_turno", "Fecha requerida").not().isEmpty(),
    (0, express_validator_1.body)("fecha_turno", "Formato de fecha incorrecto (YYYY-MM-DD)").matches(/^\d{4}-\d{2}-\d{2}$/),
    (0, express_validator_1.body)("hora_inicio_turno", "Hora de inicio requerida").not().isEmpty(),
    (0, express_validator_1.body)("hora_inicio_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
    (0, express_validator_1.body)("hora_fin_turno", "Hora de fin requerida").not().isEmpty(),
    (0, express_validator_1.body)("hora_fin_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
];
exports.datosTurnoBorrar = [
    (0, express_validator_1.param)("cod_turno", "Código de turno requerido").not().isEmpty(),
    (0, express_validator_1.param)("cod_turno", "Debe ser un número entero").isInt(),
];
exports.datosTurnoActualizar = [
    (0, express_validator_1.body)("cod_turno", "Código de turno requerido").not().isEmpty(),
    (0, express_validator_1.body)("cod_turno", "Debe ser un número entero").isInt(),
    (0, express_validator_1.body)("cod_parqueadero", "Código de parqueadero debe ser un número").optional().isInt(),
    (0, express_validator_1.body)("descripcion_turno", "Descripción requerida").not().isEmpty(),
    (0, express_validator_1.body)("descripcion_turno", "Máximo 200 caracteres").isLength({ max: 200 }),
    (0, express_validator_1.body)("fecha_turno", "Fecha requerida").not().isEmpty(),
    (0, express_validator_1.body)("fecha_turno", "Formato de fecha incorrecto (YYYY-MM-DD)").matches(/^\d{4}-\d{2}-\d{2}$/),
    (0, express_validator_1.body)("hora_inicio_turno", "Hora de inicio requerida").not().isEmpty(),
    (0, express_validator_1.body)("hora_inicio_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
    (0, express_validator_1.body)("hora_fin_turno", "Hora de fin requerida").not().isEmpty(),
    (0, express_validator_1.body)("hora_fin_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
];

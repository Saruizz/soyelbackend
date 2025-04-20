import { body, param } from "express-validator";

export const datosTurnoCrear = [
    body("cod_parqueadero", "Código de parqueadero debe ser un número").optional().isInt(),
    body("descripcion_turno", "Descripción requerida").not().isEmpty(),
    body("descripcion_turno", "Máximo 200 caracteres").isLength({ max: 200 }),
    body("fecha_turno", "Fecha requerida").not().isEmpty(),
    body("fecha_turno", "Formato de fecha incorrecto (YYYY-MM-DD)").matches(/^\d{4}-\d{2}-\d{2}$/),
    body("hora_inicio_turno", "Hora de inicio requerida").not().isEmpty(),
    body("hora_inicio_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
    body("hora_fin_turno", "Hora de fin requerida").not().isEmpty(),
    body("hora_fin_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
];

export const datosTurnoBorrar = [
    param("cod_turno", "Código de turno requerido").not().isEmpty(),
    param("cod_turno", "Debe ser un número entero").isInt(),
];

export const datosTurnoActualizar = [
    body("cod_turno", "Código de turno requerido").not().isEmpty(),
    body("cod_turno", "Debe ser un número entero").isInt(),
    body("cod_parqueadero", "Código de parqueadero debe ser un número").optional().isInt(),
    body("descripcion_turno", "Descripción requerida").not().isEmpty(),
    body("descripcion_turno", "Máximo 200 caracteres").isLength({ max: 200 }),
    body("fecha_turno", "Fecha requerida").not().isEmpty(),
    body("fecha_turno", "Formato de fecha incorrecto (YYYY-MM-DD)").matches(/^\d{4}-\d{2}-\d{2}$/),
    body("hora_inicio_turno", "Hora de inicio requerida").not().isEmpty(),
    body("hora_inicio_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
    body("hora_fin_turno", "Hora de fin requerida").not().isEmpty(),
    body("hora_fin_turno", "Formato de hora incorrecto (HH:MM:SS)").matches(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/),
];
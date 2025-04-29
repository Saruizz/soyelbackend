import { body, param } from "express-validator";

export const datosTurnoCrear = [
    body("descripcionTurno","Nombre requerido").not().isEmpty(),
    body("descripcionTurno", "Minimo 5 caracteres").isLength({ min: 5}),
    body("fechaTurno", "Fecha requerida").not().isEmpty(),
    body("horaInicioTurno", "Hora inicial requerida").not().isEmpty(),
    body("horaFinTurno", "Hora final requerida").not().isEmpty(),
];


export const datosTurnoBorrar = [
    param("codTurno", "Debe ser un numero").isInt(),
    param("codTurno", "Maximo 6 caracteres").isLength({max: 6}),
];

export const datosTurnoActualizar = [
    body("codTurno","Codigo requerido").not().isEmpty(),
    body("codTurno", "Debe ser un numero").isInt(),
    body("descripcionTurno","Nombre requerido").not().isEmpty(),
    body("descripcionTurno", "Minimo 5 caracteres").isLength({ min: 5}),          
];
import {body, param} from "express-validator";

export const datosIncomeCreate=[
    body("codUsuario","Usuario requerido").not().isEmpty().isInt(),
    body("codUsuario", "Maximo 6 caracteres").isLength({max:5}),
    body("fechaIngreso", "Fecha requerida").not().isEmpty(),
    body("horaIngreso", "Hora requerida").not().isEmpty(),
];

export const datosIncomeDelete = [
    param('codIngreso','Usuario requerido').not().isEmpty().isInt(),
    param('codIngreso', 'Maximo 6 caracteres').isLength({max:5}),
];

export const datosIncomeUpdate = [
    body('codUsuario','Usuario requerido').not().isEmpty().isInt(),
    body('codUsuario', 'Maximo 6 caracteres').isLength({max:5}),
    body("fechaIngreso", "Fecha requerida").not().isEmpty(),
    body("horaIngreso", "Hora requerida").not().isEmpty(),
];

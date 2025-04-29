import {body, param} from "express-validator";

export const datosAccessCreate=[
    body("correo","Correo requerido").not().isEmpty(),
    body("correo", "Minimo 5 caracteres").isLength({min:5}),
    body("clave", "Minimo 5 caracteres").isLength({min:5}),
    body("uuid", "Minimo 5 caracteres").isLength({min:5}),
    body("codUsuario", "Debe ser numerico").isInt(),
];

export const datosAccessDelete = [
    param('codUsuario','Usuario requerido').not().isEmpty().isInt(),
    param('codUsuario', 'Maximo 6 caracteres').isLength({max:5}),
    param('codUsuario', 'Debe ser numerico').isInt(),
];

export const datosAccessUpdate = [
    body('codUsuario','Usuario requerido').not().isEmpty().isInt(),
    body('codUsuario', 'Maximo 6 caracteres').isLength({max:5}),
    body("correo","Correo requerido").not().isEmpty(),
    body("correo", "Minimo 5 caracteres").isLength({min:5}),
    body("clave", "Minimo 5 caracteres").isLength({min:5}),
    body("uuid", "Minimo 5 caracteres").isLength({min:5}),
];

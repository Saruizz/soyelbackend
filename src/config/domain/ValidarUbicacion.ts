import { body, param } from "express-validator";

export const datosUbicacionCrear = [
    body("nombreUbicacion","Nombre requerido").not().isEmpty(),
    body("nombreUbicacion", "Minimo 5 caracteres").isLength({ min: 5}),
    body("codExternoUbicacion", "Codigo Externo requerido").not().isEmpty(),
];


export const datosUbicacionBorrar = [
    param("codUbicacion", "Debe ser un numero").isInt(),
    //param("codUbicacion", "Maximo 6 caracteres").isLength({max: 6}),
];

export const datosUbicacionActualizar = [
    body("codUbicacion","Codigo requerido").not().isEmpty(),
    body("codUbicacion", "Debe ser un numero").isInt(),
    body("codExternoUbicacion","Codigo Externo requerido").not().isEmpty(),
    body("codExternoUbicacion", "Minimo 5 caracteres").isLength({ min: 5}),
    body("nombreUbicacion","Nombre requerido").not().isEmpty(),
    body("nombreUbicacion", "Minimo 5 caracteres").isLength({ min: 5}),          
];
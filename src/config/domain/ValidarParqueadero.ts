import { body, param } from "express-validator";

export const datosParqueaderoCrear = [
    body("nombreParqueadero","Nombre requerido").not().isEmpty(),
    body("nombreParqueadero", "Minimo 5 caracteres").isLength({ min: 5}),
    body("codUbicacion", "Ubicacion requerida").not().isEmpty(),
    body("dirParqueadero", "Direccion requerida").not().isEmpty(),
    body("telParqueadero", "Telefono requerido").not().isEmpty(),
];


export const datosParqueaderoBorrar = [
    param("codParqueadero", "Debe ser un numero").isInt(),
    param("codParqueadero", "Maximo 6 caracteres").isLength({max: 6}),
];

export const datosParqueaderoActualizar = [
    body("codParqueadero","Codigo requerido").not().isEmpty(),
    body("codParqueadero", "Debe ser un numero").isInt(),
    body("nombreParqueadero","Nombre requerido").not().isEmpty(),
    body("nombreParqueadero", "Minimo 5 caracteres").isLength({ min: 5}),          
];
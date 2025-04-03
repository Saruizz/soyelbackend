import { body, param } from "express-validator";

export const datosLogin = [
    body("correoAcceso", "Correo electrónico requerido").not().isEmpty(),
    body("correoAcceso", "Debe ingresar un correo electrónico válido").isEmail(),
    body("correoAcceso", "El correo debe tener máximo 200 caracteres").isLength({
        max: 200,
    }),

    body("claveAcceso", "Contraseña requerida").not().isEmpty(),
    body(
        "claveAcceso",
        "La contraseña debe tener entre 6 y 200 caracteres"
    ).isLength({ min: 6, max: 200 }),
];

export const datosValidarSesion = [
    body("codUsuario", "Código de usuario requerido").not().isEmpty(),
    body("codUsuario", "Código de usuario debe ser numérico").isInt(),

    body("uuidAcceso", "Token de sesión requerido").not().isEmpty(),
    body("uuidAcceso", "Token de sesión inválido").isLength({
        min: 10,
        max: 100,
    }),
];

export const datosCerrarSesion = [
    body("codUsuario", "Código de usuario requerido").not().isEmpty(),
    body("codUsuario", "Código de usuario debe ser numérico").isInt(),
];

export const datosHistorialIngresos = [
    param("codUsuario", "Código de usuario requerido").not().isEmpty(),
    param("codUsuario", "Código de usuario debe ser numérico").isInt(),
];

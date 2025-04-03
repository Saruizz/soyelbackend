import { body, param } from "express-validator";

export const datosRolCrear = [
    body("nombreRol", "El nombre del rol es obligatorio").not().isEmpty(),
    body(
        "nombreRol",
        "El nombre del rol debe tener al menos 5 caracteres"
    ).isLength({ min: 5 }),
    body(
        "nombreRol",
        "El nombre del rol solo puede contener letras y espacios"
    ).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    body(
        "nombreRol",
        "El nombre del rol no puede exceder 50 caracteres"
    ).isLength({ max: 50 }),
];

export const datosRolBorrar = [
    param("codRol", "El código de rol debe ser un número entero").isInt({
        min: 1,
    }),
    param("codRol", "El código de rol no puede tener más de 6 dígitos").isLength({
        max: 6,
    }),
];

export const datosRolActualizar = [
    body("codRol", "El código de rol es obligatorio").not().isEmpty(),
    body("codRol", "El código de rol debe ser un número entero").isInt({
        min: 1,
    }),

    body("nombreRol", "El nombre del rol es obligatorio").trim().not().isEmpty(),
    body(
        "nombreRol",
        "El nombre del rol debe tener al menos 5 caracteres"
    ).isLength({ min: 5 }),
    body(
        "nombreRol",
        "El nombre del rol solo puede contener letras y espacios"
    ).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    body(
        "nombreRol",
        "El nombre del rol no puede exceder 50 caracteres"
    ).isLength({ max: 50 }),
];

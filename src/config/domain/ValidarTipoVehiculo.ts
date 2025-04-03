import { body, param } from "express-validator";

export const datosTipoVehiculoCrear = [
    body("claseTipoVehiculo", "La clase de tipo de vehículo es obligatoria")
        .not()
        .isEmpty(),
    body(
        "claseTipoVehiculo",
        "La clase de tipo de vehículo debe tener al menos 4 caracteres"
    ).isLength({ min: 4 }),
    body(
        "claseTipoVehiculo",
        "La clase de tipo de vehículo solo puede contener letras y espacios"
    ).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    body(
        "claseTipoVehiculo",
        "La clase de tipo de vehículo no puede exceder 50 caracteres"
    ).isLength({ max: 50 }),
];

export const datosTipoVehiculoBorrar = [
    param(
        "codTipoVehiculo",
        "El código de tipo de vehículo debe ser un número entero"
    ).isInt({ min: 1 }),
    param(
        "codTipoVehiculo",
        "El código de tipo de vehículo no puede tener más de 5 dígitos"
    ).isLength({ max: 5 }),
];

export const datosTipoVehiculoActualizar = [
    body("codTipoVehiculo", "El código de tipo de vehículo es obligatorio")
        .not()
        .isEmpty(),
    body(
        "codTipoVehiculo",
        "El código de tipo de vehículo debe ser un número entero"
    ).isInt({ min: 1 }),

    body("claseTipoVehiculo", "La clase de tipo de vehículo es obligatoria")
        .trim()
        .not()
        .isEmpty(),
    body(
        "claseTipoVehiculo",
        "La clase de tipo de vehículo debe tener al menos 4 caracteres"
    ).isLength({ min: 4 }),
    body(
        "claseTipoVehiculo",
        "La clase de tipo de vehículo solo puede contener letras y espacios"
    ).matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    body(
        "claseTipoVehiculo",
        "La clase de tipo de vehículo no puede exceder 50 caracteres"
    ).isLength({ max: 50 }),
];

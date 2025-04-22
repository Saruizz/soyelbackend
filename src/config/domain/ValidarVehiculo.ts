import { body, param } from "express-validator";

export const datosVehiculoCrear = [
    body("codTipoVehiculo", "El código de tipo de vehículo es obligatorio").not().isEmpty(),
    body("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero positivo").isInt({ min: 1 }),

    body("codUsuario", "El código de usuario es obligatorio").not().isEmpty(),
    body("codUsuario", "El código de usuario debe ser un número entero positivo").isInt({ min: 1 }),

    body("placaVehiculo", "La placa del vehículo es obligatoria").not().isEmpty(),
    body("placaVehiculo", "La placa del vehículo debe tener entre 5 y 10 caracteres").isLength({ min: 5, max: 10 }),
    body("placaVehiculo", "La placa del vehículo solo puede contener letras, números y guiones").matches(/^[A-Za-z0-9\-]+$/)
];

export const datosVehiculoBorrar = [
    param("codVehiculo", "El código de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    param("codVehiculo", "El código de vehículo no puede tener más de 6 dígitos").isLength({ max: 6 })
];

export const datosVehiculoActualizar = [
    body("codVehiculo", "El código de vehículo es obligatorio").not().isEmpty(),
    body("codVehiculo", "El código de vehículo debe ser un número entero positivo").isInt({ min: 1 }),

    body("codTipoVehiculo", "El código de tipo de vehículo es obligatorio").not().isEmpty(),
    body("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero positivo").isInt({ min: 1 }),

    body("codUsuario", "El código de usuario es obligatorio").not().isEmpty(),
    body("codUsuario", "El código de usuario debe ser un número entero positivo").isInt({ min: 1 }),

    body("placaVehiculo", "La placa del vehículo es obligatoria").not().isEmpty(),
    body("placaVehiculo", "La placa del vehículo debe tener entre 5 y 10 caracteres").isLength({ min: 5, max: 10 }),
    body("placaVehiculo", "La placa del vehículo solo puede contener letras, números y guiones").matches(/^[A-Za-z0-9\-]+$/)
];

export const datosVehiculoConsultarPorId = [
    param("codVehiculo", "El código de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    param("codVehiculo", "El código de vehículo no puede tener más de 6 dígitos").isLength({ max: 6 })
];

export const datosVehiculoConsultarPorTipo = [
    param("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    param("codTipoVehiculo", "El código de tipo de vehículo no puede tener más de 6 dígitos").isLength({ max: 6 })
];

export const datosVehiculoConsultarPorUsuario = [
    param("codUsuario", "El código de usuario debe ser un número entero positivo").isInt({ min: 1 }),
    param("codUsuario", "El código de usuario no puede tener más de 6 dígitos").isLength({ max: 6 })
];

export const datosVehiculoConsultarPorPlaca = [
    param("placaVehiculo", "La placa del vehículo debe tener entre 5 y 10 caracteres").isLength({ min: 5, max: 10 }),
    param("placaVehiculo", "La placa del vehículo solo puede contener letras, números y guiones").matches(/^[A-Za-z0-9\-]+$/)
];
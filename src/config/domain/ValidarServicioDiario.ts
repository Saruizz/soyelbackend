import { body, param } from "express-validator";

export const datosServicioDiarioVerParamServicioDiario = [
    param("codServicioDiario", "Código de servicio diario requerido")
        .not()
        .isEmpty(),
    param("codServicioDiario", "Código de servicio diario debe ser numérico").isInt(),
    param(
        "codServicioDiario",
        "Máximo 5 caracteres para código de servicio diario"
    ).isLength({ max: 5 }),
];

export const datosServicioDiarioCrear = [
    // Validaciones para cod_servicio_diario
    body("codServicioDiario", "Código de servicio diario requerido").not().isEmpty(),
    body("codServicioDiario", "Código de servicio diario debe ser numérico").isInt(),
    body(
        "codServicioDiario",
        "Máximo 5 caracteres para código de servicio diario"
    ).isLength({ max: 5 }),
    body("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    body("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    body(
        "codParqueadero",
        "Máximo 5 caracteres para código de parqueadero"
    ).isLength({ max: 5 }),
    body("codVehiculo", "Código de vehículo requerido")
        .not()
        .isEmpty(),
    body("codVehiculo", "Código de vehículo debe ser numérico").isInt(),
    body(
        "codVehiculo",
        "Máximo 5 caracteres para código de tipo de vehículo"
    ).isLength({ max: 5 }),
    body("valorServicioDiario", "Valor de servicio diario requerido")
        .not()
        .isEmpty(),
    body("valorServicioDiario", "Valor de servicio diario debe ser numérico").isFloat(
        { min: 0 }
    ),
    body("valorServicioDiario", "Mínimo 4 dígitos para servicio diario").custom(
        (value) => {
            const stringValue = value.toString();
            return stringValue.replace(/[.,]/, "").length >= 4;
        }
    ),
    // Validaciones para fechaInicioServicioDiario
    body("fechaInicioServicioDiario", "Fecha de inicio requerida").not().isEmpty(),
    body("fechaInicioServicioDiario", "Fecha de inicio debe ser válida").isISO8601(),
    // Validaciones para fechaFinServicioDiario
    body("fechaFinServicioDiario", "Fecha de fin requerida").not().isEmpty(),
    body("fechaFinServicioDiario", "Fecha de fin debe ser válida").isISO8601(),
];

export const datosServicioDiarioActualizar = [
    body("codServicioDiario", "Código de servicio diario requerido").not().isEmpty(),
    body("codServicioDiario", "Código de servicio diario debe ser numérico").isInt(),
    body(
        "codServicioDiario",
        "Máximo 5 caracteres para código de servicio diario"
    ).isLength({ max: 5 }),
    ...datosServicioDiarioCrear, // Reutiliza las validaciones de creación
];
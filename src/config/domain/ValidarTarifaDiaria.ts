import { body, param } from "express-validator";

export const datosTarifaDiariaVerParamParqueadero = [
    param("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    param("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    param(
        "codParqueadero",
        "Máximo 5 caracteres para código de parqueadero"
    ).isLength({ max: 5 }),
];

export const datosTarifaDiariaVerParamTipoVehiculo = [
    param("codTipoVehiculo", "Código de tipo de vehículo requerido")
        .not()
        .isEmpty(),
    param(
        "codTipoVehiculo",
        "Código de tipo de vehículo debe ser numérico"
    ).isInt(),
    param(
        "codTipoVehiculo",
        "Máximo 5 caracteres para código de tipo de vehículo"
    ).isLength({ max: 5 }),
];

export const datosTarifaDiariaCrear = [
    // Validaciones para cod_parqueadero
    body("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    body("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    body(
        "codParqueadero",
        "Máximo 5 caracteres para código de parqueadero"
    ).isLength({ max: 5 }),

    body("codTipoVehiculo", "Código de tipo de vehículo requerido")
        .not()
        .isEmpty(),
    body(
        "codTipoVehiculo",
        "Código de tipo de vehículo debe ser numérico"
    ).isInt(),
    body(
        "codTipoVehiculo",
        "Máximo 5 caracteres para código de tipo de vehículo"
    ).isLength({ max: 5 }),

    body("valorTarifaDiaria", "Valor de tarifa diaria requerido").not().isEmpty(),
    body("valorTarifaDiaria", "Valor de tarifa diaria debe ser numérico").isFloat(
        { min: 0 }
    ),
    body("valorTarifaDiaria", "Mínimo 4 dígitos para tarifa diaria").custom(
        (value) => {
            const stringValue = value.toString();
            return stringValue.replace(/[.,]/, "").length >= 4;
        }
    ),
];

export const datosTarifaDiariaActualizar = [
    body("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    body("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    body(
        "codParqueadero",
        "Máximo 5 caracteres para código de parqueadero"
    ).isLength({ max: 5 }),

    body("codTipoVehiculo", "Código de tipo de vehículo requerido")
        .not()
        .isEmpty(),
    body(
        "codTipoVehiculo",
        "Código de tipo de vehículo debe ser numérico"
    ).isInt(),
    body(
        "codTipoVehiculo",
        "Máximo 5 caracteres para código de tipo de vehículo"
    ).isLength({ max: 5 }),

    body("valorTarifaDiaria", "Valor de tarifa diaria requerido").not().isEmpty(),
    body("valorTarifaDiaria", "Valor de tarifa diaria debe ser numérico").isFloat(
        { min: 0 }
    ),
    body("valorTarifaDiaria", "Mínimo 4 dígitos para tarifa diaria").custom(
        (value) => {
            const stringValue = value.toString();
            return stringValue.replace(/[.,]/, "").length >= 4;
        }
    ),
];

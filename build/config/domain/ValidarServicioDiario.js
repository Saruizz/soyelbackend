"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosServicioDiarioActualizar = exports.datosServicioDiarioCrear = exports.datosServicioDiarioVerParamServicioDiario = void 0;
const express_validator_1 = require("express-validator");
exports.datosServicioDiarioVerParamServicioDiario = [
    (0, express_validator_1.param)("codServicioDiario", "Código de servicio diario requerido")
        .not()
        .isEmpty(),
    (0, express_validator_1.param)("codServicioDiario", "Código de servicio diario debe ser numérico").isInt(),
    (0, express_validator_1.param)("codServicioDiario", "Máximo 5 caracteres para código de servicio diario").isLength({ max: 5 }),
];
exports.datosServicioDiarioCrear = [
    // Validaciones para cod_servicio_diario
    (0, express_validator_1.body)("codServicioDiario", "Código de servicio diario requerido").not().isEmpty(),
    (0, express_validator_1.body)("codServicioDiario", "Código de servicio diario debe ser numérico").isInt(),
    (0, express_validator_1.body)("codServicioDiario", "Máximo 5 caracteres para código de servicio diario").isLength({ max: 5 }),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    (0, express_validator_1.body)("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),
    (0, express_validator_1.body)("codVehiculo", "Código de vehículo requerido")
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("codVehiculo", "Código de vehículo debe ser numérico").isInt(),
    (0, express_validator_1.body)("codVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),
    (0, express_validator_1.body)("valorServicioDiario", "Valor de servicio diario requerido")
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("valorServicioDiario", "Valor de servicio diario debe ser numérico").isFloat({ min: 0 }),
    (0, express_validator_1.body)("valorServicioDiario", "Mínimo 4 dígitos para servicio diario").custom((value) => {
        const stringValue = value.toString();
        return stringValue.replace(/[.,]/, "").length >= 4;
    }),
    // Validaciones para fechaInicioServicioDiario
    (0, express_validator_1.body)("fechaInicioServicioDiario", "Fecha de inicio requerida").not().isEmpty(),
    (0, express_validator_1.body)("fechaInicioServicioDiario", "Fecha de inicio debe ser válida").isISO8601(),
    // Validaciones para fechaFinServicioDiario
    (0, express_validator_1.body)("fechaFinServicioDiario", "Fecha de fin requerida").not().isEmpty(),
    (0, express_validator_1.body)("fechaFinServicioDiario", "Fecha de fin debe ser válida").isISO8601(),
];
exports.datosServicioDiarioActualizar = [
    (0, express_validator_1.body)("codServicioDiario", "Código de servicio diario requerido").not().isEmpty(),
    (0, express_validator_1.body)("codServicioDiario", "Código de servicio diario debe ser numérico").isInt(),
    (0, express_validator_1.body)("codServicioDiario", "Máximo 5 caracteres para código de servicio diario").isLength({ max: 5 }),
    ...exports.datosServicioDiarioCrear, // Reutiliza las validaciones de creación
];

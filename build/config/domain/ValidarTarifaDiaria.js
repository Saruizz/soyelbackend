"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosTarifaDiariaActualizar = exports.datosTarifaDiariaCrear = exports.datosTarifaDiariaVerParamTipoVehiculo = exports.datosTarifaDiariaVerParamParqueadero = void 0;
const express_validator_1 = require("express-validator");
exports.datosTarifaDiariaVerParamParqueadero = [
    (0, express_validator_1.param)("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    (0, express_validator_1.param)("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    (0, express_validator_1.param)("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),
];
exports.datosTarifaDiariaVerParamTipoVehiculo = [
    (0, express_validator_1.param)("codTipoVehiculo", "Código de tipo de vehículo requerido")
        .not()
        .isEmpty(),
    (0, express_validator_1.param)("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    (0, express_validator_1.param)("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),
];
exports.datosTarifaDiariaCrear = [
    // Validaciones para cod_parqueadero
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    (0, express_validator_1.body)("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo requerido")
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    (0, express_validator_1.body)("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),
    (0, express_validator_1.body)("valorTarifaDiaria", "Valor de tarifa diaria requerido").not().isEmpty(),
    (0, express_validator_1.body)("valorTarifaDiaria", "Valor de tarifa diaria debe ser numérico").isFloat({ min: 0 }),
    (0, express_validator_1.body)("valorTarifaDiaria", "Mínimo 4 dígitos para tarifa diaria").custom((value) => {
        const stringValue = value.toString();
        return stringValue.replace(/[.,]/, "").length >= 4;
    }),
];
exports.datosTarifaDiariaActualizar = [
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    (0, express_validator_1.body)("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo requerido")
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    (0, express_validator_1.body)("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),
    (0, express_validator_1.body)("valorTarifaDiaria", "Valor de tarifa diaria requerido").not().isEmpty(),
    (0, express_validator_1.body)("valorTarifaDiaria", "Valor de tarifa diaria debe ser numérico").isFloat({ min: 0 }),
    (0, express_validator_1.body)("valorTarifaDiaria", "Mínimo 4 dígitos para tarifa diaria").custom((value) => {
        const stringValue = value.toString();
        return stringValue.replace(/[.,]/, "").length >= 4;
    }),
];

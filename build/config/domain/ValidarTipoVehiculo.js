"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosTipoVehiculoActualizar = exports.datosTipoVehiculoBorrar = exports.datosTipoVehiculoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosTipoVehiculoCrear = [
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo es obligatoria")
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo debe tener al menos 4 caracteres").isLength({ min: 4 }),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo solo puede contener letras y espacios").matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo no puede exceder 50 caracteres").isLength({ max: 50 }),
];
exports.datosTipoVehiculoBorrar = [
    (0, express_validator_1.param)("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero").isInt({ min: 1 }),
    (0, express_validator_1.param)("codTipoVehiculo", "El código de tipo de vehículo no puede tener más de 5 dígitos").isLength({ max: 5 }),
];
exports.datosTipoVehiculoActualizar = [
    (0, express_validator_1.body)("codTipoVehiculo", "El código de tipo de vehículo es obligatorio")
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero").isInt({ min: 1 }),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo es obligatoria")
        .trim()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo debe tener al menos 4 caracteres").isLength({ min: 4 }),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo solo puede contener letras y espacios").matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
    (0, express_validator_1.body)("claseTipoVehiculo", "La clase de tipo de vehículo no puede exceder 50 caracteres").isLength({ max: 50 }),
];

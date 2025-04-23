"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosVehiculoConsultarPorPlaca = exports.datosVehiculoConsultarPorUsuario = exports.datosVehiculoConsultarPorTipo = exports.datosVehiculoConsultarPorId = exports.datosVehiculoActualizar = exports.datosVehiculoBorrar = exports.datosVehiculoCrear = void 0;
const express_validator_1 = require("express-validator");
exports.datosVehiculoCrear = [
    (0, express_validator_1.body)("codTipoVehiculo", "El código de tipo de vehículo es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.body)("codUsuario", "El código de usuario es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("codUsuario", "El código de usuario debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.body)("placaVehiculo", "La placa del vehículo es obligatoria").not().isEmpty(),
    (0, express_validator_1.body)("placaVehiculo", "La placa del vehículo debe tener entre 5 y 10 caracteres").isLength({ min: 5, max: 10 }),
    (0, express_validator_1.body)("placaVehiculo", "La placa del vehículo solo puede contener letras, números y guiones").matches(/^[A-Za-z0-9\-]+$/)
];
exports.datosVehiculoBorrar = [
    (0, express_validator_1.param)("codVehiculo", "El código de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.param)("codVehiculo", "El código de vehículo no puede tener más de 6 dígitos").isLength({ max: 6 })
];
exports.datosVehiculoActualizar = [
    (0, express_validator_1.body)("codVehiculo", "El código de vehículo es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("codVehiculo", "El código de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.body)("codTipoVehiculo", "El código de tipo de vehículo es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.body)("codUsuario", "El código de usuario es obligatorio").not().isEmpty(),
    (0, express_validator_1.body)("codUsuario", "El código de usuario debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.body)("placaVehiculo", "La placa del vehículo es obligatoria").not().isEmpty(),
    (0, express_validator_1.body)("placaVehiculo", "La placa del vehículo debe tener entre 5 y 10 caracteres").isLength({ min: 5, max: 10 }),
    (0, express_validator_1.body)("placaVehiculo", "La placa del vehículo solo puede contener letras, números y guiones").matches(/^[A-Za-z0-9\-]+$/)
];
exports.datosVehiculoConsultarPorId = [
    (0, express_validator_1.param)("codVehiculo", "El código de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.param)("codVehiculo", "El código de vehículo no puede tener más de 6 dígitos").isLength({ max: 6 })
];
exports.datosVehiculoConsultarPorTipo = [
    (0, express_validator_1.param)("codTipoVehiculo", "El código de tipo de vehículo debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.param)("codTipoVehiculo", "El código de tipo de vehículo no puede tener más de 6 dígitos").isLength({ max: 6 })
];
exports.datosVehiculoConsultarPorUsuario = [
    (0, express_validator_1.param)("codUsuario", "El código de usuario debe ser un número entero positivo").isInt({ min: 1 }),
    (0, express_validator_1.param)("codUsuario", "El código de usuario no puede tener más de 6 dígitos").isLength({ max: 6 })
];
exports.datosVehiculoConsultarPorPlaca = [
    (0, express_validator_1.param)("placaVehiculo", "La placa del vehículo debe tener entre 5 y 10 caracteres").isLength({ min: 5, max: 10 }),
    (0, express_validator_1.param)("placaVehiculo", "La placa del vehículo solo puede contener letras, números y guiones").matches(/^[A-Za-z0-9\-]+$/)
];

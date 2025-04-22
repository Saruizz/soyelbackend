"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosPuestoActualizar = exports.datosPuestoCrear = exports.datosPuestoVerParam = void 0;
const express_validator_1 = require("express-validator");
// Validaciones para el parámetro codPuesto
exports.datosPuestoVerParam = [
    (0, express_validator_1.param)("codPuesto", "Código de puesto requerido").not().isEmpty(),
    (0, express_validator_1.param)("codPuesto", "Código de puesto debe ser numérico").isInt(),
    (0, express_validator_1.param)("codPuesto", "Máximo 5 caracteres para código de puesto").isLength({ max: 5 }),
];
// Validaciones para crear un puesto
exports.datosPuestoCrear = [
    (0, express_validator_1.body)("codPuesto", "Código de puesto requerido").not().isEmpty(),
    (0, express_validator_1.body)("codPuesto", "Código de puesto debe ser numérico").isInt(),
    (0, express_validator_1.body)("codPuesto", "Máximo 5 caracteres para código de puesto").isLength({ max: 5 }),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    (0, express_validator_1.body)("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo requerido").not().isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    (0, express_validator_1.body)("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),
    (0, express_validator_1.body)("detallePuesto", "Estado del puesto requerido").not().isEmpty(),
    (0, express_validator_1.body)("detallePuesto", "Estado del puesto debe ser 'activo' o 'inactivo'").isIn(["activo", "inactivo"]),
];
// Validaciones para actualizar un puesto
exports.datosPuestoActualizar = [
    (0, express_validator_1.body)("codPuesto", "Código de puesto requerido").not().isEmpty(),
    (0, express_validator_1.body)("codPuesto", "Código de puesto debe ser numérico").isInt(),
    (0, express_validator_1.body)("codPuesto", "Máximo 5 caracteres para código de puesto").isLength({ max: 5 }),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    (0, express_validator_1.body)("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    (0, express_validator_1.body)("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo requerido").not().isEmpty(),
    (0, express_validator_1.body)("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    (0, express_validator_1.body)("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),
    (0, express_validator_1.body)("detallePuesto", "Estado del puesto requerido").not().isEmpty(),
    (0, express_validator_1.body)("detallePuesto", "Estado del puesto debe ser 'activo' o 'inactivo'").isIn(["activo", "inactivo"]),
];

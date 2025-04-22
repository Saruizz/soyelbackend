"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datosRelRolFunctionalityDelete = exports.datosRelRolFunctionalityCreate = void 0;
const express_validator_1 = require("express-validator");
exports.datosRelRolFunctionalityCreate = [
    (0, express_validator_1.body)("codRol").isNumeric().withMessage("El código del rol debe ser un número"),
    (0, express_validator_1.body)("codFunctionality").isNumeric().withMessage("El código de la funcionalidad debe ser un número")
];
exports.datosRelRolFunctionalityDelete = [
    (0, express_validator_1.body)("codRol").isNumeric().withMessage("El código del rol debe ser un número"),
    (0, express_validator_1.body)("codFunctionality").isNumeric().withMessage("El código de la funcionalidad debe ser un número")
];

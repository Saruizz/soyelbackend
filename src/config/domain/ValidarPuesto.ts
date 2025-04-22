import { body, param } from "express-validator";

// Validaciones para el parámetro codPuesto
export const datosPuestoVerParam = [
    param("codPuesto", "Código de puesto requerido").not().isEmpty(),
    param("codPuesto", "Código de puesto debe ser numérico").isInt(),
    param("codPuesto", "Máximo 5 caracteres para código de puesto").isLength({ max: 5 }),
];

// Validaciones para crear un puesto
export const datosPuestoCrear = [
    body("codPuesto", "Código de puesto requerido").not().isEmpty(),
    body("codPuesto", "Código de puesto debe ser numérico").isInt(),
    body("codPuesto", "Máximo 5 caracteres para código de puesto").isLength({ max: 5 }),

    body("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    body("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    body("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),

    body("codTipoVehiculo", "Código de tipo de vehículo requerido").not().isEmpty(),
    body("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    body("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),

    body("detallePuesto", "Estado del puesto requerido").not().isEmpty(),
    body("detallePuesto", "Estado del puesto debe ser 'activo' o 'inactivo'").isIn(["activo", "inactivo"]),
];

// Validaciones para actualizar un puesto
export const datosPuestoActualizar = [
    body("codPuesto", "Código de puesto requerido").not().isEmpty(),
    body("codPuesto", "Código de puesto debe ser numérico").isInt(),
    body("codPuesto", "Máximo 5 caracteres para código de puesto").isLength({ max: 5 }),

    body("codParqueadero", "Código de parqueadero requerido").not().isEmpty(),
    body("codParqueadero", "Código de parqueadero debe ser numérico").isInt(),
    body("codParqueadero", "Máximo 5 caracteres para código de parqueadero").isLength({ max: 5 }),

    body("codTipoVehiculo", "Código de tipo de vehículo requerido").not().isEmpty(),
    body("codTipoVehiculo", "Código de tipo de vehículo debe ser numérico").isInt(),
    body("codTipoVehiculo", "Máximo 5 caracteres para código de tipo de vehículo").isLength({ max: 5 }),


    body("detallePuesto", "Estado del puesto requerido").not().isEmpty(),
    body("detallePuesto", "Estado del puesto debe ser 'activo' o 'inactivo'").isIn(["activo", "inactivo"]),
];
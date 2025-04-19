import { body, param } from "express-validator";

export const datosServicioCrear = [
    body("nombreServicio", "El nombre del servicio es obligatorio")
        .not()
        .isEmpty(),
    body(
        "nombreServicio",
        "El nombre del servicio debe tener al menos 3 caracteres"
    ).isLength({ min: 3 }),
    body(
        "nombreServicio",
        "El nombre del servicio no puede exceder 100 caracteres"
    ).isLength({ max: 100 }),

    body("descripcion", "La descripción es obligatoria")
        .not()
        .isEmpty(),
    body(
        "descripcion",
        "La descripción no puede exceder 255 caracteres"
    ).isLength({ max: 255 }),

    body("precio", "El precio es obligatorio")
        .not()
        .isEmpty(),
    body("precio", "El precio debe ser un número válido")
        .isFloat({ min: 0 })
];

export const datosServicioActualizar = [
    body("codServicio", "El código de servicio es obligatorio")
        .not()
        .isEmpty(),
    body("codServicio", "El código de servicio debe ser un número entero")
        .isInt({ min: 1 }),
    ...datosServicioCrear,
    body("estado", "El estado debe ser un valor booleano")
        .isBoolean()
];

export const datosIngresoCrear = [
    body("codServicio", "El código de servicio es obligatorio")
        .not()
        .isEmpty(),
    body("codServicio", "El código de servicio debe ser un número entero")
        .isInt({ min: 1 }),

    body("cantidad", "La cantidad es obligatoria")
        .not()
        .isEmpty(),
    body("cantidad", "La cantidad debe ser un número entero positivo")
        .isInt({ min: 1 }),

    body("observaciones")
        .optional()
        .isLength({ max: 255 })
        .withMessage("Las observaciones no pueden exceder 255 caracteres")
];

export const datosFiltroFecha = [
    body("fechaInicio", "La fecha de inicio es obligatoria")
        .not()
        .isEmpty()
        .isISO8601()
        .withMessage("La fecha de inicio debe tener un formato válido (YYYY-MM-DD)"),

    body("fechaFin", "La fecha fin es obligatoria")
        .not()
        .isEmpty()
        .isISO8601()
        .withMessage("La fecha fin debe tener un formato válido (YYYY-MM-DD)")
        .custom((fechaFin, { req }) => {
            if (new Date(fechaFin) < new Date(req.body.fechaInicio)) {
                throw new Error("La fecha fin debe ser mayor o igual a la fecha de inicio");
            }
            return true;
        })
];

export const datosIngresoActualizar = [
    body("cantidad", "La cantidad es obligatoria")
        .not()
        .isEmpty(),
    body("cantidad", "La cantidad debe ser un número entero positivo")
        .isInt({ min: 1 }),

    body("observaciones")
        .optional()
        .isLength({ max: 255 })
        .withMessage("Las observaciones no pueden exceder 255 caracteres")
];
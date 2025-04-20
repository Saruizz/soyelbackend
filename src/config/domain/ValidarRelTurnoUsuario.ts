import { body } from "express-validator";

export const datosRelTurnoUsuario = [
    body("cod_turno").isInt().withMessage("El código del turno debe ser un número entero"),
    body("cod_usuario").isInt().withMessage("El código del usuario debe ser un número entero")
];
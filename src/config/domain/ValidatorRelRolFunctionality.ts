import { body } from "express-validator";

export const datosRelRolFunctionalityCreate = [
    body("codRol").isNumeric().withMessage("El código del rol debe ser un número"),
    body("codFunctionality").isNumeric().withMessage("El código de la funcionalidad debe ser un número")
]

export const datosRelRolFunctionalityDelete = [
    body("codRol").isNumeric().withMessage("El código del rol debe ser un número"),
    body("codFunctionality").isNumeric().withMessage("El código de la funcionalidad debe ser un número")
]

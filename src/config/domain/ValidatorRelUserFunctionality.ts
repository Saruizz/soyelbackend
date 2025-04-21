import { body } from "express-validator";

export const datosRelUserFunctionalityCreate = [
    body("codUsuario", "Código de usuario requerido").not().isEmpty(),
    body("codUsuario", "Código de usuario debe ser numérico").isInt(),
    body("codFuncionalidad", "Código de funcionalidad requerido").not().isEmpty(),
    body("codFuncionalidad", "Código de funcionalidad debe ser numérico").isInt()
]
export const datosRelUserFunctionalityDelete = [
    body("codUsuario", "Código de usuario requerido").not().isEmpty(),
    body("codUsuario", "Código de usuario debe ser numérico").isInt(),
    body("codFuncionalidad", "Código de funcionalidad requerido").not().isEmpty(),
    body("codFuncionalidad", "Código de funcionalidad debe ser numérico").isInt()
]

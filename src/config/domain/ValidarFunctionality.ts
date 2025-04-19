import { body } from "express-validator";

export const datosFunctionalityCreate = [
    body("codFuncionalidad", "Código de funcionalidad requerido").not().isEmpty(),
    body("codFuncionalidad", "Código de funcionalidad debe ser numérico").isInt(),
    body('nombreFuncionalidad', 'Nombre de funcionalidad requerido').not().isEmpty(),
    body('nombreFuncionalidad', 'Nombre de funcionalidad debe ser alfanumérico').isAlphanumeric(),
    body('urlFuncionalidad', 'URL de funcionalidad requerida').not().isEmpty(),
    body('urlFuncionalidad', 'URL de funcionalidad debe ser una URL válida').not().isEmpty()
];
export const datosFunctionalityDelete = [
    body('codFuncionalidad', 'Código de funcionalidad requerido').not().isEmpty(),
    body('codFuncionalidad', 'Código de funcionalidad debe ser numérico').isInt()
];
export const datosFunctionalityUpdate = [
    body('codFuncionalidad', 'Código de funcionalidad requerido').not().isEmpty(),
    body("nombreFuncionalidad", "Nombre de funcionalidad requerido").not().isEmpty(),
    body("nombreFuncionalidad", "Nombre de funcionalidad debe ser alfanumérico").isAlphanumeric(),
    body("urlFuncionalidad", "URL de funcionalidad requerida").not().isEmpty(),
    body("urlFuncionalidad", "URL de funcionalidad debe ser una URL válida").not().isEmpty()
];
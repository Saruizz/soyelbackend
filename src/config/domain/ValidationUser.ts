import { body, param } from "express-validator";

export const datosUserCreate = [
    body('codRol','Codigo requerido').not().isEmpty(),
    body('codRol','Codigo debe ser numerico').isInt(),
    body('documentoUsuario','Documento requerido').not().isEmpty(),
    body('documentoUsuario', 'Minimo 5 caracteres').isLength({min:5}),
    body('nombresUsuario','Nombres requerido').not().isEmpty(),
    body('nombresUsuario', 'Minimo 5 caracteres').isLength({min:5}),
    body('apellidosUsuario','Apellidos requerido').not().isEmpty(),
    body('apellidosUsuario', 'Minimo 5 caracteres').isLength({min:5}),
    body('generoUsuario','Genero requerido').not().isEmpty(),
    body('generoUsuario', 'Minimo 1 caracteres').isLength({min:1}),
    body('fechaNacimientoUsuario','Fecha de nacimiento requerida').not().isEmpty(),
    body('fechaNacimientoUsuario', 'Formato de fecha invalido').isDate(),
    body('telefonoUsuario','Telefono requerido').not().isEmpty(),
    body('telefonoUsuario', 'Minimo 8 caracteres').isLength({min:8}),
]

export const datosUserDelete = [
    param('codUsuario','Usuario requerido').isInt(),
    param('codUsuario', 'Maximo 6 caracteres').isLength({max:5}),
]

export const datosUserUpdate = [
    body('codUsuario','Usuario requerido').not().isEmpty(),
    body('codUsuario','Usuario debe ser numerico').isInt(),
    body('documentoUsuario','Documento requerido').trim().not().isEmpty(),
    body('documentoUsuario', 'Minimo 5 caracteres').isLength({min:5}),
]
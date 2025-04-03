"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_ACCESO = void 0;
exports.SQL_ACCESO = {
    FIND_BY_CREDENTIALS: "SELECT a.cod_usuario as codUsuario, \
     a.correo_acceso as correoAcceso, \
     a.clave_acceso as claveAcceso, \
     a.uuid_acceso as uuidAcceso \
     FROM accesos a \
     WHERE a.correo_acceso = $1 AND a.clave_acceso = $2",
    FIND_BY_EMAIL: "SELECT a.cod_usuario as codUsuario, \
     a.correo_acceso as correoAcceso, \
     a.clave_acceso as claveAcceso, \
     a.uuid_acceso as uuidAcceso \
     FROM accesos a \
     WHERE a.correo_acceso = $1",
    FIND_BY_ID: "SELECT a.cod_usuario as codUsuario, \
     a.correo_acceso as correoAcceso, \
     a.clave_acceso as claveAcceso, \
     a.uuid_acceso as uuidAcceso \
     FROM accesos a \
     WHERE a.cod_usuario = $1",
    UPDATE_UUID: "UPDATE accesos SET uuid_acceso = $2 \
     WHERE cod_usuario = $1 \
     RETURNING cod_usuario as codUsuario, \
               correo_acceso as correoAcceso, \
               clave_acceso as claveAcceso, \
               uuid_acceso as uuidAcceso"
};

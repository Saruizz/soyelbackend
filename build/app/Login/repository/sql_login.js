"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sql_login = {
    getData: "SELECT u.cod_usuario as codUsuario, u.nombres_usuario as nombresUsuario, " +
        "u.apellidos_usuario as apellidosUsuario, r.nombre_rol as nombreRol " +
        "FROM usuarios u " +
        "JOIN roles r ON u.cod_rol = r.cod_rol " +
        "WHERE u.cod_usuario = $1",
    dataUser: "SELECT u.cod_usuario as codUsuario, u.nombres_usuario as nombresUsuario, " +
        "u.apellidos_usuario as apellidosUsuario, r.nombre_rol as nombreRol " +
        "FROM usuarios u " +
        "JOIN roles r ON u.cod_rol = r.cod_rol " +
        "WHERE u.cod_usuario = $1",
};
exports.default = sql_login;

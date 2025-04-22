"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const SQL_REL_ROL_FUNCIONALIDAD = {
    getAll: 'SELECT * FROM rel_rol_funcionalidad',
    create: 'INSERT INTO rel_rol_funcionalidad (cod_rol, cod_funcionalidad) VALUES (?, ?)',
    update: 'UPDATE rel_rol_funcionalidad SET cod_rol = ?, cod_funcionalidad = ? WHERE cod_rol = ? AND cod_funcionalidad = ?',
    delete: 'DELETE FROM rel_rol_funcionalidad WHERE cod_rol = ? AND cod_funcionalidad = ?',
};
exports.default = SQL_REL_ROL_FUNCIONALIDAD;

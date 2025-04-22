"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sqlRelUserFunctionality = void 0;
exports.sqlRelUserFunctionality = {
    getAll: `SELECT * FROM rel_usuario_funcionalidad`,
    getById: `SELECT * FROM rel_usuario_funcionalidad WHERE cod_usuario = $1`,
    create: `INSERT INTO rel_usuario_funcionalidad (cod_usuario, cod_funcionalidad) VALUES ($1, $2)`,
    update: `UPDATE rel_usuario_funcionalidad SET cod_usuario = $2, cod_funcionalidad = $3 WHERE cod_usuario = $1`,
    delete: `DELETE FROM rel_usuario_funcionalidad WHERE cod_usuario = $1 and cod_funcionalidad = $2`,
    getByUser: `SELECT * FROM rel_usuario_funcionalidad WHERE cod_usuario = $1`,
    getByFunctionality: `SELECT * FROM rel_usuario_funcionalidad WHERE cod_funcionalidad = $1`,
};

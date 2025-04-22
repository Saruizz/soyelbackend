"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sqlIngreso = {
    INSERT: `INSERT INTO ingresos (cod_usuario, fecha_ingreso, hora_ingreso) VALUES ($1, $2, $3)`,
    GETALL: 'SELECT * FROM ingresos',
    GETBYID: 'SELECT * FROM ingresos WHERE cod_ingreso = $1',
    UPDATE: 'UPDATE ingresos SET cod_usuario = $2, fecha_ingreso = $3, hora_ingreso = $4 WHERE cod_ingreso = $1',
    DELETE: 'DELETE FROM ingresos WHERE cod_ingreso = $1',
    GETUSERBYID: 'SELECT * FROM usuarios WHERE cod_usuario = $1'
};
exports.default = sqlIngreso;

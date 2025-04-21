"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQL_UBICACION = void 0;
exports.SQL_UBICACION = {
    FIND_ALL: "SELECT u.cod_ubicacion,u.cod_padre_ubicacion, u.cod_externo_ubicacion, u.nombre_ubicacion \
        FROM ubicaciones u ORDER BY u.cod_ubicacion",
    FIND_BY_ID: "SELECT u.cod_ubicacion,u.cod_padre_ubicacion, u.cod_externo_ubicacion, u.nombre_ubicacion \
        FROM ubicaciones u \
        WHERE u.cod_ubicacion = $1",
    HOW_MANY: "SELECT COUNT(u.cod_ubicacion) as cantidad FROM ubicaciones u \
        WHERE  u.nombre_ubicacion = $1",
    HOW_MANY_COD: "SELECT COUNT(u.cod_ubicacion) as cantidad FROM ubicaciones u \
        WHERE  u.cod_ubicacion = $1 or u.cod_padre_ubicacion= $1",
    HOW_MANY_PARQUEADEROS: "SELECT COUNT(p.cod_parqueadero) as cantidad FROM parqueaderos p \
        WHERE  p.cod_ubicacion = $1",
    ADD: "INSERT INTO ubicaciones (cod_padre_ubicacion, cod_externo_ubicacion, nombre_ubicacion) VALUES ($1,$2,$3) \
        returning cod_ubicacion",
    DELETE: "DELETE FROM ubicaciones where cod_ubicacion=$1",
    UPDATE: "UPDATE ubicaciones SET cod_padre_ubicacion = $2,cod_externo_ubicacion = $3 ,nombre_ubicacion = $4 WHERE \
        cod_ubicacion = $1",
};

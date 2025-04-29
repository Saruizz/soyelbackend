export const SQL_PARQUEADERO = {
    FIND_ALL: "SELECT p.cod_parqueadero,p.cod_ubicacion, p.nombre_parqueadero, p.direccion_parqueadero, p.telefono_parqueadero \
        FROM parqueaderos p ORDER BY p.cod_parqueadero",

    FIND_BY_ID: "SELECT p.cod_parqueadero,p.cod_ubicacion, p.nombre_parqueadero, p.direccion_parqueadero, p.telefono_parqueadero \
        FROM parqueaderos p \
        WHERE p.cod_parqueadero = $1",

    HOW_MANY: "SELECT COUNT(p.cod_parqueadero) as cantidad FROM parqueaderos p \
        WHERE  p.nombre_parqueadero = $1",

    HOW_MANY_COD: "SELECT COUNT(p.cod_parqueadero) as cantidad FROM parqueaderos p \
        WHERE  p.cod_parqueadero = $1",

    HOW_MANY_TURNOS: "SELECT COUNT(t.cod_turno) as cantidad FROM turnos t \
        WHERE t.cod_parqueadero = $1",

    ADD: "INSERT INTO parqueaderos (cod_ubicacion, nombre_parqueadero, direccion_parqueadero, telefono_parqueadero) VALUES ($1,$2,$3,$4) \
        returning cod_parqueadero",

    DELETE: "DELETE FROM parqueaderos where cod_parqueadero=$1",

    UPDATE: "UPDATE parqueaderos SET cod_ubicacion = $2 ,nombre_parqueadero = $3, direccion_parqueadero=$4, telefono_parqueadero=$5 WHERE \
        cod_parqueadero = $1",

}
export const SQL_TIPO_VEHICULO = {
    FIND_ALL: "SELECT tv.cod_tipo_vehiculo, tv.clase_tipo_vehiculo \
    FROM tipos_vehiculos tv ORDER BY tv.cod_tipo_vehiculo",

    FIND_BY_ID: "SELECT tv.cod_tipo_vehiculo, tv.clase_tipo_vehiculo \
    FROM tipos_vehiculos tv WHERE tv.cod_tipo_vehiculo = $1",

    HOW_MANY: "SELECT COUNT(tv.cod_tipo_vehiculo) as cantidad \
    FROM tipos_vehiculos tv WHERE tv.clase_tipo_vehiculo = $1",

    ADD: "INSERT INTO tipos_vehiculos(clase_tipo_vehiculo) VALUES ($1) \
    RETURNING cod_tipo_vehiculo",

    DELETE: "DELETE FROM tipos_vehiculos WHERE cod_tipo_vehiculo = $1",

    UPDATE: "UPDATE tipos_vehiculos SET clase_tipo_vehiculo = $1 \
    WHERE cod_tipo_vehiculo = $2"
};
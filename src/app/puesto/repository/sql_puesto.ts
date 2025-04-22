export const SQL_PUESTO = {
    FIND_ALL:
        "SELECT cod_puesto as codPuesto, \
        cod_parqueadero as codParqueadero, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        detalle_puesto as detallePuesto \
        FROM puestos",

    FIND_BY_PRIMARY_KEY:
        "SELECT cod_puesto as codPuesto, \
        cod_parqueadero as codParqueadero, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        detalle_puesto as detallePuesto \
        FROM puestos \
        WHERE cod_puesto = $1 " , 

    HOW_MANY:
        "SELECT COUNT(*) as cantidad \
        FROM puestos \
        WHERE cod_puesto = $1",

    ADD:
        "INSERT INTO puestos (cod_puesto, cod_parqueadero, cod_tipo_vehiculo, detalle_puesto) \
        VALUES($1, $2, $3, $4) \
        RETURNING cod_puesto as codPuesto, \
                    cod_parqueadero as codParqueadero, \
                    cod_tipo_vehiculo as codTipoVehiculo, \
                    detalle_puesto as detallePuesto",

    DELETE:
        "DELETE FROM puestos \
        WHERE cod_puesto = $1",

    UPDATE:
        "UPDATE puestos \
        SET cod_parqueadero = $2, cod_tipo_vehiculo = $3, detalle_puesto = $4 \
        WHERE cod_puesto = $1 \
        RETURNING cod_puesto as codPuesto, \
                    cod_parqueadero as codParqueadero, \
                    cod_tipo_vehiculo as codTipoVehiculo, \
                    detalle_puesto as detallePuesto",

};
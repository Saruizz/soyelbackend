export const SQL_VEHICULO = {
    FIND_ALL:
        "SELECT cod_vehiculo as codVehiculo, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        cod_usuario as codUsuario, \
        placa_vehiculo as placaVehiculo \
        FROM vehiculo",
    FIND_BY_PRIMARY_KEY:
        "SELECT cod_vehiculo as codVehiculo, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        cod_usuario as codUsuario, \
        placa_vehiculo as placaVehiculo \
        FROM vehiculo \
        WHERE cod_vehiculo = $1",
    FIND_BY_ID_TIPO_VEHICULO:
        "SELECT cod_vehiculo as codVehiculo, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        cod_usuario as codUsuario, \
        placa_vehiculo as placaVehiculo \
        FROM vehiculo \
        WHERE cod_tipo_vehiculo = $1",
    FIND_BY_ID_USUARIO:
        "SELECT cod_vehiculo as codVehiculo, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        cod_usuario as codUsuario, \
        placa_vehiculo as placaVehiculo \
        FROM vehiculo \
        WHERE cod_usuario = $1",
    FIND_BY_PLACA:
        "SELECT cod_vehiculo as codVehiculo, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        cod_usuario as codUsuario, \
        placa_vehiculo as placaVehiculo \
        FROM vehiculo \
        WHERE placa_vehiculo = $1",
    FIND_BY_ID_PARQUEADERO:
        "SELECT cod_vehiculo as codVehiculo, \
        cod_tipo_vehiculo as codTipoVehiculo, \
        cod_usuario as codUsuario, \
        placa_vehiculo as placaVehiculo \
        FROM vehiculo \
        WHERE cod_parqueadero = $1",
    HOW_MANY:
        "SELECT COUNT(*) as cantidad \
        FROM vehiculo \
        WHERE placa_vehiculo = $1",
    ADD:
        "INSERT INTO vehiculo (cod_tipo_vehiculo, cod_usuario, placa_vehiculo) \
        VALUES($1, $2, $3) \
        RETURNING cod_vehiculo as codVehiculo, \
                  cod_tipo_vehiculo as codTipoVehiculo, \
                  cod_usuario as codUsuario, \
                  placa_vehiculo as placaVehiculo",
    DELETE:
        "DELETE FROM vehiculo \
        WHERE cod_vehiculo = $1",
    UPDATE:
        "UPDATE vehiculo \
        SET cod_tipo_vehiculo = $2, cod_usuario = $3, placa_vehiculo = $4 \
        WHERE cod_vehiculo = $1 \
        RETURNING cod_vehiculo as codVehiculo, \
                  cod_tipo_vehiculo as codTipoVehiculo, \
                  cod_usuario as codUsuario, \
                  placa_vehiculo as placaVehiculo",
};
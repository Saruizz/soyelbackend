export const SQL_SERVICIO_DIARIO = {
    FIND_ALL:
    "SELECT cod_servicio_diario as codServicioDiario, \
    cod_parqueadero as codParqueadero, \
    cod_vehiculo as codVehiculo, \
    cod_puesto as codPuesto, \
    fecha_inicio_servicio_diario as FechaInicioServicioDiario, \
    fecha_fin_servicio_diario as FechaFinServicioDiario, \
    valor_servicio_diario as ValorServicioDiario \
    FROM servicios_diarios",

    FIND_BY_PRIMARY_KEY:
    "SELECT cod_servicio_diario as codServicioDiario, \
    cod_parqueadero as codParqueadero, \
    cod_vehiculo as codVehiculo, \
    cod_puesto as codPuesto, \
    fecha_inicio_servicio_diario as FechaInicioServicioDiario, \
    fecha_fin_servicio_diario as FechaFinServicioDiario, \
    valor_servicio_diario as ValorServicioDiario \
    FROM servicios_diarios \
    WHERE cod_servicio_diario = $1",

    HOW_MANY:
    "SELECT COUNT(*) as cantidad \
    FROM servicios_diarios \
    WHERE cod_servicio_diario = $1", 

    ADD: 
    "INSERT INTO servicios_diarios (cod_servicio_diario, cod_parqueadero, cod_vehiculo, cod_puesto, fecha_inicio_servicio_diario, fecha_fin_servicio_diario, valor_servicio_diario) \
    VALUES($1, $2, $3, $4, $5, $6, $7) \
    RETURNING cod_servicio_diario as codServicioDiario, \
              cod_parqueadero as codParqueadero, \
              cod_vehiculo as codVehiculo, \
              cod_puesto as codPuesto, \
              fecha_inicio_servicio_diario as FechaInicioServicioDiario, \
              fecha_fin_servicio_diario as FechaFinServicioDiario, \
              valor_servicio_diario as ValorServicioDiario",

    DELETE:
    "DELETE FROM servicios_diarios \
    WHERE cod_servicio_diario = $1",

    UPDATE:
    "UPDATE servicios_diarios \
     SET valor_servicio_diario = $7 \
        WHERE cod_servicio_diario = $1 \
        RETURNING cod_servicio_diario as codServicioDiario, \
                  cod_parqueadero as codParqueadero, \
                  cod_vehiculo as codVehiculo, \
                  cod_puesto as codPuesto, \
                  fecha_inicio_servicio_diario as FechaInicioServicioDiario, \
                  fecha_fin_servicio_diario as FechaFinServicioDiario, \
                  valor_servicio_diario as ValorServicioDiario",
};
export const SQL_INGRESO = {
    ADD:
        "INSERT INTO ingresos(cod_usuario, fecha_ingreso, hora_ingreso) \
     VALUES($1, current_date, current_time) \
     RETURNING cod_ingreso as codIngreso, \
               cod_usuario as codUsuario, \
               TO_CHAR(fecha_ingreso, 'DD/MM/YYYY') as fechaIngreso, \
               TO_CHAR(hora_ingreso, 'HH12:MI:SS AM') as horaIngreso",

    FIND_BY_USER:
        "SELECT i.cod_ingreso as codIngreso, \
            TO_CHAR(i.fecha_ingreso, 'DD/MM/YYYY') as fechaIngreso, \
            TO_CHAR(i.hora_ingreso, 'HH12:MI:SS AM') as horaIngreso \
        FROM ingresos i \
        WHERE i.cod_usuario = $1 \
        ORDER BY i.fecha_ingreso DESC, i.hora_ingreso DESC",

    LAST_ENTRY:
        "SELECT i.cod_ingreso as codIngreso, \
            TO_CHAR(i.fecha_ingreso, 'DD/MM/YYYY') as fechaIngreso, \
            TO_CHAR(i.hora_ingreso, 'HH12:MI:SS AM') as horaIngreso \
        FROM ingresos i \
        WHERE i.cod_usuario = $1 \
        ORDER BY i.fecha_ingreso DESC, i.hora_ingreso DESC \
        LIMIT 1",
};
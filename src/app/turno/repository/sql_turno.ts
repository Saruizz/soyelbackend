export const SQL_TURNO = {
    FIND_ALL: "SELECT t.cod_turno,t.cod_parqueadero, t.descripcion_turno, t.fecha_turno, t.hora_inicio_turno, t.hora_fin_turno \
        FROM turnos t ORDER BY t.cod_turno",

    FIND_BY_ID: "SELECT t.cod_turno,t.cod_parqueadero, t.descripcion_turno, t.fecha_turno, t.hora_inicio_turno, t.hora_fin_turno \
        FROM turnos t \
        WHERE t.cod_turno = $1",

    HOW_MANY: "SELECT COUNT(t.cod_turno) as cantidad FROM turnos t \
        WHERE t.descripcion_turno = $1",
    
    HOW_MANY_COD: "SELECT COUNT(t.cod_turno) as cantidad FROM turnos t \
        WHERE t.cod_turno = $1",

    HOW_MANY_PARQUEADEROS: "SELECT COUNT(p.cod_parqueadero) as cantidad FROM parqueaderos p \
        WHERE p.cod_parqueadero in (select cod_parqueadero from turnos where cod_turno = $1)",

    ADD: "INSERT INTO turnos (cod_parqueadero, descripcion_turno, fecha_turno, hora_inicio_turno, hora_fin_turno) VALUES ($1,$2,$3,$4,$5) \
        returning cod_turno",

    DELETE: "DELETE FROM turnos where cod_turno=$1",

    UPDATE: "UPDATE turnos SET descripcion_turno = $1 WHERE \
        cod_tuno = $2",

}
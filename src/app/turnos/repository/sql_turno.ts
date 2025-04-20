export const SQL_TURNO = {
    FIND_ALL:
      "SELECT t.cod_turno, t.cod_parqueadero, t.descripcion_turno, t.fecha_turno, t.hora_inicio_turno, t.hora_fin_turno \
      FROM turnos t ORDER BY t.cod_turno",
  
    FIND_BY_ID:
      "SELECT t.cod_turno, t.cod_parqueadero, t.descripcion_turno, t.fecha_turno, t.hora_inicio_turno, t.hora_fin_turno \
      FROM turnos t WHERE t.cod_turno = $1",
  
      HOW_MANY: "SELECT COUNT(t.cod_turno) as cantidad FROM turnos t \
      WHERE t.fecha_turno = $1 AND t.hora_inicio_turno = $2 AND t.hora_fin_turno = $3",

      ADD: "INSERT INTO turnos(cod_parqueadero, descripcion_turno, fecha_turno, hora_inicio_turno, hora_fin_turno) \
      VALUES ($1, $2, $3, $4, $5) RETURNING cod_turno",
      
    DELETE:
      "DELETE FROM turnos WHERE cod_turno = $1 RETURNING *",
  
    UPDATE:
      "UPDATE turnos SET cod_parqueadero = $1, descripcion_turno = $2, fecha_turno = $3, \
      hora_inicio_turno = $4, hora_fin_turno = $5 WHERE cod_turno = $6"
  };
  
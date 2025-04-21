export const SQL_REL_TURNO_USUARIO = {
    INSERT: `INSERT INTO rel_turno_usuario (cod_turno, cod_usuario) VALUES ($1, $2) RETURNING cod_turnousuario;`,
    DELETE: `DELETE FROM rel_turno_usuario WHERE cod_turnousuario = $1;`,
    FIND_BY_ID: `SELECT * FROM rel_turno_usuario WHERE cod_turnousuario = $1;`,
    FIND_ALL: `SELECT * FROM rel_turno_usuario;`,
    UPDATE: `UPDATE rel_turno_usuario SET cod_turno = $1, cod_usuario = $2 WHERE cod_turnousuario = $3;`
  };
  
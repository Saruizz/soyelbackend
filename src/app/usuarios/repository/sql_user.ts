export const sql_usuarios = {
  FIND_ALL: "SELECT * FROM usuarios ORDER BY cod_usuario",

  FIND_BY_ID: "SELECT * FROM usuarios WHERE cod_usuario = $1",

  HOW_MANY:
    "SELECT COUNT(cod_usuario) as cantidad FROM usuarios WHERE documento_usuario = $1",

  ADD: "INSERT INTO usuarios(cod_rol, documento_usuario, nombres_usuario, apellidos_usuario, genero_usuario, fecha_nacimiento_usuario, telefono_usuario)   VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING cod_usuario",

  UPDATE:
    "UPDATE usuarios SET cod_rol = $1, documento_usuario = $2, nombres_usuario = $3, apellidos_usuario = $4, genero_usuario = $5, fecha_nacimiento_usuario = $6, telefono_usuario = $7 WHERE cod_usuario = $8",

  DELETE: "DELETE FROM usuarios WHERE cod_usuario = $1",
};

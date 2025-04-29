export const sql_functionality = {
  getAll: `SELECT * FROM funcionalidades`,
  getById: `SELECT * FROM funcionalidades WHERE cod_funcionalidad = $1`,
  create: `INSERT INTO funcionalidades (cod_padre_funcionalidad, nombre_funcionalidad, url_funcionalidad) VALUES ($1, $2, $3)`,
  update: `UPDATE funcionalidades SET cod_padre_funcionalidad = $2, nombre_funcionalidad = $3, url_funcionalidad = $4 WHERE cod_funcionalidad = $1`,
  delete: `DELETE FROM funcionalidades WHERE cod_funcionalidad = $1 and cod_rol = $2`,
  getByParentId: `SELECT * FROM funcionalidades WHERE cod_padre_funcionalidad = $1`,
  getByUserId: `SELECT cod_funcionalidad FROM usuarios WHERE cod_usuario = $1`,
  getByParentIdAndUserId: `SELECT * FROM funcionalidades WHERE cod_padre_funcionalidad = $1 AND cod_usuario = $2`,
  getByUserIdAndParentId: `SELECT * FROM funcionalidades WHERE cod_usuario = $1 AND cod_padre_funcionalidad = $2`,
};


export const sql_accesos = {
  getAll: `SELECT * FROM accesos`,
  getById: `SELECT * FROM accesos WHERE cod_usuario = $1`,
  create: `INSERT INTO accesos (cod_usuario, correo_acceso, clave_acceso, uuid_acceso) VALUES ($1, $2, $3, $4) RETURNING *`,
  update: `UPDATE accesos SET correo_acceso = $2, clave_acceso = $3, uuid_acceso = $4 WHERE cod_usuario = $1`,
  delete: `DELETE FROM accesos WHERE cod_usuario = $1`,
  getByCorreo: `SELECT * FROM accesos WHERE correo_acceso = $1`,
  getByUuid: `SELECT * FROM accesos WHERE uuid_acceso = $1`, // Agregado para obtener por UUID
  getByUserId: `SELECT cod_usuario FROM usuarios WHERE cod_usuario = $1`, // Agregado para obtener por cod_usuario
};
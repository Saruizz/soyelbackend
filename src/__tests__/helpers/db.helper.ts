import { pgPromiseConnection } from "../setup";

export const dbHelper = {
  /**
   * Crea datos de prueba en una tabla específica
   * @param table Nombre de la tabla
   * @param data Datos a insertar
   * @returns Registro creado
   */
  async createTestData(table: string, data: any) {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    return await pgPromiseConnection.one(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
  },

  /**
   * Obtiene un registro de prueba por ID
   * @param table Nombre de la tabla
   * @param idColumn Nombre de la columna ID (por defecto 'id')
   * @param id ID del registro
   * @returns Registro encontrado
   */
  async getTestData(table: string, id: number, idColumn: string = "id") {
    return await pgPromiseConnection.one(
      `SELECT * FROM ${table} WHERE ${idColumn} = $1`,
      [id]
    );
  },

  /**
   * Elimina un registro de prueba
   * @param table Nombre de la tabla
   * @param idColumn Nombre de la columna ID (por defecto 'id')
   * @param id ID del registro
   */
  async deleteTestData(table: string, id: number, idColumn: string = "id") {
    return await pgPromiseConnection.none(
      `DELETE FROM ${table} WHERE ${idColumn} = $1`,
      [id]
    );
  },

  /**
   * Actualiza un registro de prueba
   * @param table Nombre de la tabla
   * @param idColumn Nombre de la columna ID (por defecto 'id')
   * @param id ID del registro
   * @param data Datos a actualizar
   * @returns Registro actualizado
   */
  async updateTestData(
    table: string,
    id: number,
    data: any,
    idColumn: string = "id"
  ) {
    const setClause = Object.keys(data)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(", ");

    const values = [id, ...Object.values(data)];

    return await pgPromiseConnection.one(
      `UPDATE ${table} SET ${setClause} WHERE ${idColumn} = $1 RETURNING *`,
      values
    );
  },

  /**
   * Obtiene todos los registros de una tabla
   * @param table Nombre de la tabla
   * @returns Lista de registros
   */
  async getAllTestData(table: string) {
    return await pgPromiseConnection.any(`SELECT * FROM ${table}`);
  },

  /**
   * Limpia todos los datos de una tabla
   * @param table Nombre de la tabla
   */
  async cleanTable(table: string) {
    return await pgPromiseConnection.none(`TRUNCATE TABLE ${table} CASCADE`);
  },
};

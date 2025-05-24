import { db } from '../setup';

export const dbHelper = {
  /**
   * Crea datos de prueba en una tabla específica
   * @param table Nombre de la tabla
   * @param data Datos a insertar
   * @returns Registro creado
   */
  async createTestData(table: string, data: any) {
    const columns = Object.keys(data).join(', ');
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(', ');
    
    return await db.one(
      `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`,
      values
    );
  },

  /**
   * Obtiene un registro de prueba por ID
   * @param table Nombre de la tabla
   * @param id ID del registro
   * @returns Registro encontrado
   */
  async getTestData(table: string, id: number) {
    return await db.one(`SELECT * FROM ${table} WHERE id = $1`, [id]);
  },

  /**
   * Elimina un registro de prueba
   * @param table Nombre de la tabla
   * @param id ID del registro
   */
  async deleteTestData(table: string, id: number) {
    return await db.none(`DELETE FROM ${table} WHERE id = $1`, [id]);
  },

  /**
   * Actualiza un registro de prueba
   * @param table Nombre de la tabla
   * @param id ID del registro
   * @param data Datos a actualizar
   * @returns Registro actualizado
   */
  async updateTestData(table: string, id: number, data: any) {
    const setClause = Object.keys(data)
      .map((key, index) => `${key} = $${index + 2}`)
      .join(', ');
    
    const values = [id, ...Object.values(data)];
    
    return await db.one(
      `UPDATE ${table} SET ${setClause} WHERE id = $1 RETURNING *`,
      values
    );
  },

  /**
   * Obtiene todos los registros de una tabla
   * @param table Nombre de la tabla
   * @returns Lista de registros
   */
  async getAllTestData(table: string) {
    return await db.any(`SELECT * FROM ${table}`);
  },

  /**
   * Limpia todos los datos de una tabla
   * @param table Nombre de la tabla
   */
  async cleanTable(table: string) {
    return await db.none(`TRUNCATE TABLE ${table} CASCADE`);
  }
}; 
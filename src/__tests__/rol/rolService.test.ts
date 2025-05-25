import { describe, it, expect, beforeAll } from '@jest/globals';
import { pool } from '../setup';

describe('Servicio de Rol', () => {
  beforeAll(async () => {
    // Puedes inicializar datos de prueba aquí si es necesario
  });

  it('debería poder conectarse a la base de datos', async () => {
    try {
      const result = await pool.query('SELECT 1 as test');
      expect(result.rows[0].test).toBe(1);
    } catch (error) {
      console.error("Error en prueba de conexión:", error);
      throw error;
    }
  });

  describe('crear rol',()=>{
    it('deberia crear un rol', async () => {
      const result = await pool.query('INSERT INTO rol (nombre_rol) VALUES ($1) RETURNING *', ['rol_test']);
      expect(result.rows[0].nombre_rol).toBe('rol_test');
    })
  })
});
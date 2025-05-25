import dotenv from 'dotenv';
import pgPromise from 'pg-promise';
import { Pool } from 'pg';
import { beforeAll, afterAll, describe, it, expect } from '@jest/globals';
// Cargar variables de entorno para pruebas
dotenv.config({ path: '.env.test' });

// Configuración de la base de datos de prueba
const pgp = pgPromise();
let db: any;
let pool: Pool;

// Configuración global para las pruebas
beforeAll(async () => {
  try {
    // Configurar la conexión a la base de datos de prueba
    const config = {
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      database: process.env.DB_NAME || 'soyel_test',
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
    };

    // Crear conexión pg-promise
    db = pgp(config);

    // Crear pool de conexiones
    pool = new Pool(config);

    // Verificar conexión
    await db.connect();
    console.log('✅ Conexión a la base de datos de prueba establecida');

    // Crear tablas de prueba si no existen
    await createTestTables();
  } catch (error) {
    console.error('❌ Error al configurar la base de datos de prueba:', error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Cerrar conexiones
    await db.$pool.end();
    await pool.end();
    console.log('✅ Conexiones a la base de datos cerradas');
  } catch (error) {
    console.error('❌ Error al cerrar las conexiones:', error);
  }
});

// Configuración para cada prueba
beforeEach(async () => {
  try {
    // Limpiar datos de las tablas antes de cada prueba
    await cleanTestData();
  } catch (error) {
    console.error('❌ Error al limpiar datos de prueba:', error);
  }
});

afterEach(async () => {
  try {
    // Limpiar datos después de cada prueba
    await cleanTestData();
  } catch (error) {
    console.error('❌ Error al limpiar datos después de la prueba:', error);
  }
});

// Función para crear tablas de prueba
async function createTestTables() {
  try {
    // Aquí deberías incluir los scripts SQL para crear las tablas necesarias
    await db.none(`
      -- Crear tabla de usuarios
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        cod_usuario INTEGER NOT NULL,
        cod_rol INTEGER NOT NULL,
        documento_usuario VARCHAR(20) NOT NULL,
        nombres_usuario VARCHAR(100) NOT NULL,
        apellidos_usuario VARCHAR(100) NOT NULL,
        genero_usuario INTEGER NOT NULL,
        fecha_nacimiento_usuario DATE NOT NULL,
        telefono_usuario VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      -- Agrega aquí las demás tablas necesarias para tus pruebas
    `);
    console.log('✅ Tablas de prueba creadas correctamente');
  } catch (error) {
    console.error('❌ Error al crear tablas de prueba:', error);
    throw error;
  }
}

// Función para limpiar datos de prueba
async function cleanTestData() {
  try {
    // Limpiar todas las tablas de prueba
    await db.none(`
      TRUNCATE TABLE usuarios CASCADE;
      -- Agrega aquí las demás tablas que necesites limpiar
    `);
    console.log('✅ Datos de prueba limpiados correctamente');
  } catch (error) {
    console.error('❌ Error al limpiar datos de prueba:', error);
    throw error;
  }
}

// Exportar la instancia de la base de datos para uso en las pruebas
export { db, pool }; 
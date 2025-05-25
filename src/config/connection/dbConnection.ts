import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { Pool } from "pg";
import { beforeAll, afterAll } from "@jest/globals";
import { optionsPG } from "../../config/connection/optionsPG";

// Cargar variables de entorno específicas para pruebas
dotenv.config({ path: ".env.test" });

// Configuración de pg-promise para pruebas
const pgp = pgPromise(optionsPG);
let pool: Pool;

beforeAll(async () => {
  try {
    // Configuración de conexión para ambiente de pruebas
    const portDB = Number(process.env.DB_PORT) || 5432;
    const dataDB = String(process.env.DB_NAME) || "parqueadero_test";
    const hostDB = String(process.env.DB_HOST) || "localhost";
    const userDB = String(process.env.DB_USER) || "user_parqueadero";
    const passDB = String(process.env.DB_PASSWORD) || "parqueadero123";

    // Crear pool de conexiones
    pool = new Pool({
      user: userDB,
      password: passDB,
      database: dataDB,
      host: hostDB,
      port: portDB,
      max: 5, // Número menor de conexiones para pruebas
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });

    // Verificar conexión
    const client = await pool.connect();
    console.log(`✅ Conectado a base de datos de prueba: ${dataDB}`);
    client.release();

    // Crear estructura de prueba
    await createTestTables();
  } catch (error) {
    console.error("❌ Error al configurar la base de datos de prueba:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    // Limpiar y cerrar conexiones
    await cleanTestData();
    await pool.end();
    console.log("✅ Conexiones a la base de datos cerradas");
  } catch (error) {
    console.error("❌ Error al cerrar las conexiones:", error);
  }
});

// Función para crear estructura de prueba
async function createTestTables() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS rol (
        cod_rol SERIAL PRIMARY KEY,
        nombre_rol VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS usuarios (
        cod_usuario SERIAL PRIMARY KEY,
        cod_rol INTEGER NOT NULL REFERENCES rol(cod_rol),
        documento_usuario VARCHAR(20) NOT NULL UNIQUE,
        nombres_usuario VARCHAR(100) NOT NULL,
        apellidos_usuario VARCHAR(100) NOT NULL,
        telefono_usuario VARCHAR(20) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      
      -- Agregar aquí otras tablas necesarias para pruebas
    `);
    console.log("✅ Esquema de prueba creado correctamente");
  } catch (error) {
    console.error("❌ Error al crear estructura de prueba:", error);
    throw error;
  }
}

// Función para limpiar datos de prueba
async function cleanTestData() {
  try {
    await pool.query(`
      TRUNCATE TABLE usuarios CASCADE;
      TRUNCATE TABLE rol CASCADE;
      -- Agregar otras tablas que necesiten limpieza
    `);
    console.log("✅ Datos de prueba limpiados correctamente");
  } catch (error) {
    console.error("❌ Error al limpiar datos de prueba:", error);
    throw error;
  }
}

export { pool };
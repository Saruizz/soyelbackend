import dotenv from "dotenv";
import pgPromise from "pg-promise";
import { optionsPG } from "./optionsPG";

dotenv.config({ path: "variables.env" });

const portDB = Number(process.env.PORT);
const dataDB = String(process.env.DATABASE);
const hostDB = String(process.env.HOST);
const userDB = String(process.env.USER_DB);
const passDB = String(process.env.USER_PASSWORD);

const pgp = pgPromise(optionsPG);
// En dbConnection.ts - Ajustar para alta concurrencia
const pool = pgp({
  user: userDB,
  password: passDB,
  database: dataDB,
  host: hostDB,
  port: portDB,
  max: 20, // Suficiente para testing
  idleTimeoutMillis: 5000, // Liberar conexiones rápido
  connectionTimeoutMillis: 3000, // Timeout corto
  keepAlive: true,
  allowExitOnIdle: true,
  application_name: "load-test",
});

pool
  .connect()
  .then((mithen) => {
    console.log("Conectado a: " + dataDB);
  })
  .catch((miError) => {
    console.log(miError);
  });

export default pool;

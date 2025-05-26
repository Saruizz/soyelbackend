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
const pool = pgp({
    user: userDB,
    password: passDB,
    database: dataDB,
    host: hostDB,
    port: portDB,
    max: 50, // esto depende del server PostgreSQL
    idleTimeoutMillis: 10000,
    connectionTimeoutMillis: 15000,
    allowExitOnIdle: true, // ayuda en servidores Linux
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
import { beforeAll, afterAll } from "@jest/globals";
import pgp from "pg-promise";
import { Pool } from "pg";

let db: any;
let pool: any;

beforeAll(() => {
  const config = {
    // tu configuración de base de datos
  };

  db = pgp(config);
  pool = new Pool(config);
});

afterAll(async () => {
  await pool.end();
  pgp.end();
});

export { db, pool };

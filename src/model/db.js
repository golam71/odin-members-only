import pg, { Pool } from "pg";
import "node:process";

try {
  process.loadEnvFile();
} catch (error) {
  console.log("Error loading .env going fallback");
  console.log(error);
}

let connectionString = process.env.DB_URL;

const pool = new Pool({
  connectionString,
});

export default pool;

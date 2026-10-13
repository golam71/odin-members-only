import pool from "../model/db.js";

async function findUserByEmail(email) {
  const { rows } = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
}

async function insertUser(full_name, email, hashed_password) {
  await pool.query(
    "INSERT INTO users(full_name, email, password_hash) VALUES ($1,$2,$3)",
    [full_name, email, hashed_password],
  );
}

export { findUserByEmail, insertUser };

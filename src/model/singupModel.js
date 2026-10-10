import pool from "../model/db.js";

async function insertUser(full_name, email, hashed_password) {
  try {
    await pool.query(
      "INSERT INTO users(full_name, email, password_hash) VALUES ($1,$2,$3)",
      [full_name, email, hashed_password],
    );
  } catch (error) {
    console.log(error);
  }
}

export { insertUser };

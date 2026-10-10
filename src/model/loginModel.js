import bcrypt from "bcryptjs";
import pool from "../model/db.js";

async function authenticateUser(email, password) {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  if (!rows.length) return false;

  const user = rows[0];
  const matches = await bcrypt.compare(password, user.password_hash);

  if (!matches) return false;

  delete user.password_hash;
  return user;
}

export { authenticateUser };

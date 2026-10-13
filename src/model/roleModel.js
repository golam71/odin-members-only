import pool from "./db.js";

async function makeMember(userId, password) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
  if (!rows.length) throw new Error("User not found");
  await pool.query("UPDATE users SET is_member = true WHERE id = $1", [userId]);
  return rows[0];
}

async function makeAdmin(userId, password) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [userId]);
  if (!rows.length) throw new Error("User not found");
  await pool.query("UPDATE users SET is_admin = true WHERE id = $1", [userId]);
  return rows[0];
}

export { makeMember, makeAdmin };
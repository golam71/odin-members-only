import pool from "./db.js";

async function getAllMessages() {
  const { rows } = await pool.query(
    `SELECT m.id, m.title, m.text, m.created_at, u.full_name AS author, u.id AS author_id
     FROM messages m
     LEFT JOIN users u ON u.id = m.author_id
     ORDER BY m.created_at DESC`,
  );
  return rows;
}

async function createMessage(title, text, author_id) {
  await pool.query(
    "INSERT INTO messages (title, text, author_id) VALUES ($1, $2, $3)",
    [title, text, author_id],
  );
}

async function deleteMessage(id) {
  await pool.query("DELETE FROM messages WHERE id = $1", [id]);
}

export { getAllMessages, createMessage, deleteMessage };

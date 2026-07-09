const pool = require('../config/db');

async function findAllByUser(userId) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  );
  return result.rows;
}

async function findByIdAndUser(id, userId) {
  const result = await pool.query(
    'SELECT * FROM tasks WHERE id = $1 AND user_id = $2',
    [id, userId]
  );
  return result.rows[0] || null;
}

async function create({ userId, title, description }) {
  const result = await pool.query(
    `INSERT INTO tasks (user_id, title, description)
     VALUES ($1, $2, $3)
     RETURNING *`,
    [userId, title, description || null]
  );
  return result.rows[0];
}

async function updateByIdAndUser(id, userId, { title, description, completed }) {
  const result = await pool.query(
    `UPDATE tasks
     SET title = COALESCE($1, title),
         description = COALESCE($2, description),
         completed = COALESCE($3, completed),
         updated_at = now()
     WHERE id = $4 AND user_id = $5
     RETURNING *`,
    [title ?? null, description ?? null, completed ?? null, id, userId]
  );
  return result.rows[0] || null;
}

async function deleteByIdAndUser(id, userId) {
  const result = await pool.query(
    'DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id',
    [id, userId]
  );
  return result.rows[0] || null;
}

module.exports = {
  findAllByUser,
  findByIdAndUser,
  create,
  updateByIdAndUser,
  deleteByIdAndUser,
};

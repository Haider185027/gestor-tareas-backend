function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.code === '23505') {
    return res.status(409).json({ error: 'El recurso ya existe' });
  }

  res.status(err.status || 500).json({ error: err.message || 'Error interno del servidor' });
}

module.exports = errorHandler;

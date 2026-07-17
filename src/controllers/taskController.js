const { validationResult } = require('express-validator');
const taskModel = require('../models/taskModel');
const aiService = require('../services/aiService');

async function list(req, res, next) {
  try {
    const tasks = await taskModel.findAllByUser(req.userId);
    res.json(tasks);
  } catch (err) {
    next(err);
  }
}

async function getOne(req, res, next) {
  try {
    const task = await taskModel.findByIdAndUser(req.params.id, req.userId);
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description } = req.body;
    const priority = await aiService.suggestPriority(title, description);
    const task = await taskModel.create({ userId: req.userId, title, description, priority });
    res.status(201).json(task);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { title, description, completed } = req.body;
    const task = await taskModel.updateByIdAndUser(req.params.id, req.userId, {
      title,
      description,
      completed,
    });
    if (!task) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(task);
  } catch (err) {
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    const deleted = await taskModel.deleteByIdAndUser(req.params.id, req.userId);
    if (!deleted) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
}

module.exports = { list, getOne, create, update, remove };

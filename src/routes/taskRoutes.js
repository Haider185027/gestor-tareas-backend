const { Router } = require('express');
const { body, param } = require('express-validator');
const taskController = require('../controllers/taskController');
const authMiddleware = require('../middleware/authMiddleware');

const router = Router();

router.use(authMiddleware);

router.get('/', taskController.list);

router.get('/:id', [param('id').isInt().withMessage('Id inválido')], taskController.getOne);

router.post(
  '/',
  [body('title').trim().notEmpty().withMessage('El título es requerido')],
  taskController.create
);

router.put(
  '/:id',
  [
    param('id').isInt().withMessage('Id inválido'),
    body('title').optional().trim().notEmpty().withMessage('El título no puede estar vacío'),
    body('completed').optional().isBoolean().withMessage('completed debe ser booleano'),
  ],
  taskController.update
);

router.delete('/:id', [param('id').isInt().withMessage('Id inválido')], taskController.remove);

module.exports = router;

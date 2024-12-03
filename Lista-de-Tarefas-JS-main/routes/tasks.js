const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasks');

// Rotas de tarefas
router.get('/', tasksController.getAllTasks); // Obter todas as tarefas

router.post('/', tasksController.addTask); //Adicionar uma nova tarefa

router.put('/:id', tasksController.updateTask); // Atualizar uma tarefa

router.delete('/:id', tasksController.deleteTask); // Deletar uma tarefa

module.exports = router;
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../data/tasks.json');

// Função para ler tarefas
const readTaskFromFile = () => {
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, JSON.stringify ([]));
    }
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
};

// Função para salvar tarefas
const writeTasksToFile = (tasks) => {
    fs.writeFileSync(filePath, JSON.stringify(tasks, null, 2));
};

// Controladores
exports.getAllTasks =  (req, res) => {
     const tasks = readTaskFromFile();
     res.json(tasks);
};

exports.addTask = (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: 'Titulo  é obrigatório' });
    }
    const tasks = readTaskFromFile();
    const newTask = { id: Date.now(), title, completed: false };
    tasks.push(newTask);
    writeTasksToFile(tasks);
    res.status(201).json(newTask);
};

exports.updateTask = (req, res) => {
     const { id } = req.params;
     const { title, completed } = req.body;
     
     const tasks = readTaskFromFile();
     const taskIndex = tasks.findIndex(task => task.id === parseInt(id));
     
     if (taskIndex === -1) {
         return res.status(404).json({ error: 'Tarefa não encontrada' });
     }

     tasks[taskIndex].completed = completed;
     writeTasksToFile(tasks);
     res.json(tasks[taskIndex]);
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    const tasks = readTaskFromFile();
    const filteredTasks = tasks.filter((task) => task.id !== parseInt(id));
    if (taskIndex === filteredTasks.length) {
        return res.status(404).json({ error: 'Tarefa não encontrada' });
    }
    writeTasksToFile(filteredTasks);
    res.json({ message: 'Tarefa excluída com sucesso.' });
};
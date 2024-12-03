const API_URL = "http://localhost:3000/api/tasks"; // URL da sua API

// Elementos da interface
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Função para carregar tarefas
const loadTasks = async () => {
  taskList.innerHTML = ""; // Limpar lista
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    tasks.forEach((task) => {
      addTaskToUI(task);
    });
  } catch (error) {
    console.error("Erro ao carregar tarefas:", error);
  }
};

// Função para adicionar tarefa à interface
const addTaskToUI = (task) => {
  const li = document.createElement("li");
  li.className = task.completed ? "completed" : "";
  li.dataset.id = task.id;

  li.innerHTML = `
    <span>${task.title}</span>
    <div>
      <button class="complete-btn">${task.completed ? "Desfazer" : "Completar"}</button>
      <button class="delete-btn">Excluir</button>
    </div>
  `;

  taskList.appendChild(li);
};

// Evento para adicionar nova tarefa
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = taskInput.value.trim();

  if (title) {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });

      if (response.ok) {
        const newTask = await response.json();
        addTaskToUI(newTask);
        taskInput.value = ""; // Limpar campo
      }
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  }
});

// Evento para gerenciar cliques em tarefas (completar/excluir)
taskList.addEventListener("click", async (e) => {
  if (e.target.classList.contains("complete-btn")) {
    const li = e.target.closest("li");
    const taskId = li.dataset.id;

    try {
      await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed: !li.classList.contains("completed") }),
      });

      li.classList.toggle("completed");
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  }

  if (e.target.classList.contains("delete-btn")) {
    const li = e.target.closest("li");
    const taskId = li.dataset.id;

    try {
      await fetch(`${API_URL}/${taskId}`, { method: "DELETE" });
      li.remove();
    } catch (error) {
      console.error("Erro ao excluir tarefa:", error);
    }
  }
});

// Carregar tarefas ao iniciar
loadTasks();

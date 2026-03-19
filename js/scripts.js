let tasks = [];

function loadTasks() {
    const storedTasks = localStorage.getItem('todoTasks');
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
    }
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = ''; 

    if (tasks.length === 0) {
        taskList.innerHTML = '<li class="list-group-item empty-state">No tasks yet. Add one above!</li>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `list-group-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id;

        li.innerHTML = `
            <span class="task-text" onclick="toggleTask(${task.id})">${task.text}</span>
            <div class="action-buttons">
                <button class="btn btn-action btn-check" onclick="toggleTask(${task.id})" title="Mark as done">
                    <i class="fas fa-check"></i>
                </button>
                <button class="btn btn-action btn-delete" onclick="deleteTask(${task.id})" title="Delete task">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();
    
    if (text === '') {
        taskInput.classList.add('is-invalid');
        setTimeout(() => taskInput.classList.remove('is-invalid'), 2000);
        return;
    }
    
    const newTask = {
        id: Date.now(), 
        text: text,
        completed: false
    };
    
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    
    taskInput.value = '';
    taskInput.focus(); 
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

document.getElementById('addTaskBtn').addEventListener('click', addTask);

document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

document.getElementById('taskInput').addEventListener('input', function() {
    this.classList.remove('is-invalid');
});

loadTasks();
const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const themeToggle = document.getElementById('themeToggle');

// Load tasks from localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let darkMode = JSON.parse(localStorage.getItem('darkMode')) || false;

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('completed');
        }

        li.addEventListener('click', () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            renderTasks();
        });

        const delBtn = document.createElement('button');
        delBtn.textContent = '✕';
        delBtn.title = 'Görevi Sil';
        delBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(delBtn);
        taskList.appendChild(li);
    });
}

function updateTheme() {
    if(darkMode) {
        document.body.classList.add('dark');
        themeToggle.textContent = 'Açık Mod';
    } else {
        document.body.classList.remove('dark');
        themeToggle.textContent = 'Karanlık Mod';
    }
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
}

taskForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if(text) {
        tasks.push({text, completed: false});
        saveTasks();
        renderTasks();
        taskInput.value = '';
        taskInput.focus();
    }
});

themeToggle.addEventListener('click', () => {
    darkMode = !darkMode;
    updateTheme();
});

// İlk açılışta tema ve görevleri yükle
updateTheme();
renderTasks();

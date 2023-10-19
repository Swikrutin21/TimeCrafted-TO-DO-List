document.addEventListener('DOMContentLoaded', function () {
    const taskList = document.getElementById('taskList');
    const taskNameInput = document.getElementById('taskNameInput');
    const dueDateInput = document.getElementById('dueDateInput');
    const priorityInput = document.getElementById('priorityInput');
    const addTaskButton = document.getElementById('addTask');
    const notesTextArea = document.getElementById('notesTextArea');
    const addNoteButton = document.getElementById('addNote');
    const notesSection = document.getElementById('notesSection');
    const showNotesButton = document.getElementById('showNotes');
    const taskForm = document.querySelector('form'); 

    const tasks = [];
    const notes = [];

    function addTask() {
        const taskName = taskNameInput.value.trim();
        const dueDate = dueDateInput.value;
        const priority = priorityInput.value;

        if (taskName !== '' && dueDate !== '') {
            tasks.push({ taskName, dueDate, priority, completed: false });
            renderTaskList();
            taskNameInput.value = '';
            dueDateInput.value = '';
            priorityInput.value = 'high';
        }
    }

    function addNote() {
        const noteText = notesTextArea.value.trim();
        if (noteText !== '') {
            const randomColorClass = getRandomColorClass();
            notes.push({ text: noteText, colorClass: randomColorClass });
            renderNotes();
            notesTextArea.value = '';
        }
    }

    function renderTaskList() {
        taskList.innerHTML = '';

        for (let i = 0; i < tasks.length; i++) {
            const task = tasks[i];
            const taskItem = document.createElement('div');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <input type="checkbox" id="task-${i}" ${task.completed ? 'checked' : ''}>
                <label for="task-${i}" class="${task.completed ? 'completedTask' : ''}">
                    <span class="task-name">${task.taskName}</span>
                    <span class="due-date">${task.dueDate}</span>
                    <span class="priority">${task.priority}</span>
                </label>
            `;
            taskList.appendChild(taskItem);

            const checkbox = taskItem.querySelector(`#task-${i}`);
            checkbox.addEventListener('change', () => toggleCompletion(i));
        }
    }

    function renderNotes() {
        const noteList = document.getElementById('noteList');
        noteList.innerHTML = '';

        for (const note of notes) {
            const noteCard = document.createElement('div');
            noteCard.classList.add('note-card', note.colorClass);
            noteCard.innerHTML = `<p>${note.text}</p>`;
            noteList.appendChild(noteCard);

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.classList.add('delete-button');
            deleteButton.addEventListener('click', () => deleteNote(note));
            noteCard.appendChild(deleteButton);
        }
    }

    function toggleCompletion(index) {
        const task = tasks[index];
        task.completed = !task.completed;
        renderTaskList();
    }

    function toggleNotes() {
        notesSection.style.display = notesSection.style.display === 'none' ? 'block' : 'none';
    }

    function getRandomColorClass() {
        const colorClasses = ['note-card-green', 'note-card-blue', 'note-card-red', 'note-card-orange'];
        const randomIndex = Math.floor(Math.random() * colorClasses.length);
        return colorClasses[randomIndex];
    }

    function deleteNote(note) {
        const noteIndex = notes.indexOf(note);
        if (noteIndex > -1) {
            notes.splice(noteIndex, 1);
            renderNotes();
        }
    }

    renderTaskList();
    renderNotes();

    addTaskButton.addEventListener('click', addTask);
    addNoteButton.addEventListener('click', addNote);
    showNotesButton.addEventListener('click', toggleNotes);
});

function updateDateTime() {
    const dateTimeElement = document.getElementById('date-time');
    const currentDate = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const formattedDate = currentDate.toLocaleString('en-US', options);
    dateTimeElement.textContent = formattedDate;
}

document.addEventListener('DOMContentLoaded', function () {
    updateDateTime();
    setInterval(updateDateTime, 1000);
});

// DOM components

const message = document.querySelector('#message');
const addBtn = document.querySelector('.submit');
const todoList = document.querySelector('.todo-list');

//Listening
addBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', delOrCheck);


//Functions

function addTodo(e) {
    e.preventDefault();
    const text = message.value;
    if (text == ""){
        return
    }
    else {
        // create todo divs
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = text;
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        saveLocalTodos(text);
        // buttons
        const completeBtn = document.createElement('button');
        completeBtn.innerHTML = '<i class="fas fa-check"></i>';
        completeBtn.classList.add('completed-btn');
        todoDiv.appendChild(completeBtn);
        const trashBtn = document.createElement('button');
        trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
        trashBtn.classList.add('trash-btn');
        todoDiv.appendChild(trashBtn);
        // Final Add on
        todoList.appendChild(todoDiv);
        // saveLocalTodos(message.value);
        message.value = "";
    }
}

function delOrCheck(e) {
    const item = e.target;
    if(item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        todo.classList.add('fade-away')
        const remove = () => {todo.remove()};
        setTimeout(remove, 1200);
        removeLocalTodos(todo);
    }
    if(item.classList[0] === 'completed-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    
        todos.push(todo);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
        console.log('nothing')
    } else {
        console.log('there is something')
        todos = JSON.parse(localStorage.getItem('todos'));
    
        for (i = 0; i < todos.length; i++) {
            // create todo divs
            let todoDiv = document.createElement('div');
            todoDiv.classList.add('todo');
            let newTodo = document.createElement('li');
            newTodo.textContent = todos[i];
            newTodo.classList.add('todo-item');
            todoDiv.appendChild(newTodo);

            // buttons
            let completeBtn = document.createElement('button');
            completeBtn.innerHTML = '<i class="fas fa-check"></i>';
            completeBtn.classList.add('completed-btn');
            todoDiv.appendChild(completeBtn);
            let trashBtn = document.createElement('button');
            trashBtn.innerHTML = '<i class="fas fa-trash"></i>';
            trashBtn.classList.add('trash-btn');
            todoDiv.appendChild(trashBtn);
            // Final Add on
            todoList.appendChild(todoDiv);
        }
    }
}
getTodos()

// trash > <i class="fas fa-trash"></i>
//check > <i class="fas fa-check"></i>
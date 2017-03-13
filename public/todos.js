var todosContainer = document.querySelector('#todos')
var todoItem = document.querySelector('#todoItem')
var todoButton = document.querySelector('#todoButton')
var category = document.querySelector('#category')
var due_date = document.querySelector('#due_date')

getTodos()

    

// new Pikaday({field: due_date})
new Pikaday({field: document.querySelector('#due_date')})

todoItem.addEventListener('keypress', handleKeyPressOnTodoItem)

todoButton.addEventListener('click', addTodo)

due_date.value = moment().add(1, 'day').format('YYYY-MM-DD HH:mm:ss')

// so cursor is already highlighted
todoItem.focus()

function handleClickOnCheckbox(e) {
    // Only do something if a user clicks on a checkbox input tag
    if (e.target.type === 'checkbox') {
        // Get the data-id attribute that has the current todo item ID
        // Your code goes here...

        // Check to see if the checkbox is checked (returns true if it is, false if it isn't)
        // Your code goes here...

        // Call the toggleTodoComplete function and pass our ID and completion status to it
        toggleTodoComplete(todoId, isComplete)
    }
}

// Toggle todo completion status ('yes' or 'no' in the database table)
function toggleTodoComplete(todoId, isComplete) {

    // Completed tasks call one back-end endpoint
    if (isComplete) {
        fetch('/api/v1/todos/' + todoId +  '/complete')
    }

    // Incomplete tasks call another back-end endpoint
    else {
        // Your code goes here...
    }

}

function handleKeyPressOnTodoItem(e) {
    if (e.key === 'Enter') {
        addTodo()
    }
}

function addTodo() {
    var todoTask = todoItem.value
    var selectCategory = category.value
    var due_date_value = due_date.value

    var body = {
        todos: todoTask,
        completed: false,
        category: selectCategory,
        due_date: due_date_value,
    }

    fetch('http://localhost:3000/api/v1/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
    .then(response => response.json())
    .then(showTodo)
}

function getTodos() {
    fetch('http://localhost:3000/api/v1/todos')
    .then(response => response.json())
  
    .then(loopTodos)
}

function loopTodos(todos) {
    // console.log(todos)
    todosContainer.innerHTML = ''
    todos.forEach(showTodo)
}

function showTodo(todo) {
    console.log(todo)
    var todoTemplate = 
    `<li class="list-group-item">
        <div class="row">
            <div class="col-xs-8">
                <div class="checkbox">
                    <label>
                        <input type="checkbox" data-id="${todo.id}" />
                        ${todo.todo}
                    </label>
                </div>
            </div>
            <div class="col-sm-2 text-right">
                <span class="label label-warning">${todo.category.toUpperCase()}</span>
            </div>
            <div class="col-sm-2 text-right">
                <span class="label label-default">${moment(todo.due_date).format('MM/DD/YYYY')}</span>
            </div>
        </div>
    </li>`
                    
    todosContainer.innerHTML = todoTemplate + todosContainer.innerHTML
}

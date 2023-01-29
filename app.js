// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

//event listeners
document.addEventListener('DOMContentLoaded', getTodos); //when DOM loads, run this function
todoButton.addEventListener("click", addTodo);
// add it to the general container then handle for each option generally
todoList.addEventListener("click", deleteComplete);
filterOption.addEventListener("click", filterTodo);

// Functions

function addTodo(event) {
  event.preventDefault(); // prevents the form from submitting
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  saveLocalTodos(todoInput.value);

  // check button
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("completed-btn");
  todoDiv.appendChild(completedButton);
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
  deleteButton.classList.add("delete-btn");
  todoDiv.appendChild(deleteButton);

  // attach the todo item to the Dom
  todoList.appendChild(todoDiv);

  // Clear todo input value
  todoInput.value = "";
}

function deleteComplete(event) {
  //   console.log(event.target.classList);
  const item = event.target; //classlist = ['delete-btn', value: 'delete-btn']
  if (item.classList[0] === "delete-btn") {
    // item.remove();
    const todo = item.parentElement;
    // animation
    todo.classList.add("exit-animation");
    // remove from local storage
    removeLocalTodos(todo);
    // todo.remove();
    todo.addEventListener("transitionend", function () {
      // waits until transition ends to execute
      todo.remove();
    });
  }

  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  // grab all todos
  const allTodos = todoList.childNodes;
  //   console.log(allTodos);

  allTodos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// LOCAL STORAGE
// save todos to local storage

function saveLocalTodos(todo) {
  // will be called when adding todo
  // check if there are stuff in local storage
  let todos;
  if (localStorage.getItem("todos") === null) {
    //if none, create empty array
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
    let todos;
    if (localStorage.getItem("todos") === null) {
      //if none, create empty array
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach((todo)=>{
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        // check button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);
        // delete button
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.classList.add("delete-btn");
        todoDiv.appendChild(deleteButton);

        // attach the todo item to the Dom
        todoList.appendChild(todoDiv);
    })

}

function removeLocalTodos(todo){

    let todos;
    if (localStorage.getItem("todos") === null) {
      //if none, create empty array
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    // get index of the item
    const indexToRemove = todos.indexOf(todo.children[0].innerHTML);
    // splice(index, howmany)
    todos.splice(indexToRemove,1);
    localStorage.setItem("todos", JSON.stringify(todos));//save it back

}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("new-todo-form");
  const todoList = document.getElementById("todo-list");

  // Load existing todos from localStorage
  const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];

  // Function to render todos
  const renderTodos = () => {
    todoList.innerHTML = "";
    savedTodos.forEach((todo, index) => {
      const todoItem = document.createElement("div");
      todoItem.classList.add("todo-item");

      todoItem.innerHTML = `
        <label>
          <input type="checkbox" ${todo.completed ? "checked" : ""} />
          <span class="bubble ${todo.category}"></span>
        </label>
        <div class="todo-content">
          <input type="text" value="${todo.content}" readonly />
        </div>
        <div class="actions">
          <button class="edit">Edit</button>
          <button class="delete">Delete</button>
        </div>
      `;

      // Mark as complete if checkbox is checked
      const checkbox = todoItem.querySelector("input[type='checkbox']");
      checkbox.addEventListener("change", () => {
        todo.completed = checkbox.checked;
        saveToLocalStorage();
      });

      // Edit todo functionality
      const editButton = todoItem.querySelector(".edit");
      const inputField = todoItem.querySelector("input[type='text']");
      editButton.addEventListener("click", () => {
        if (editButton.textContent.toLowerCase() === "edit") {o
          inputField.removeAttribute("readonly");
          inputField.focus();
          editButton.textContent = "Save";
        } else {
          inputField.setAttribute("readonly", "readonly");
          savedTodos[index].content = inputField.value;
          editButton.textContent = "Edit";
          saveToLocalStorage();
        }
      });

      // Delete todo functionality
      const deleteButton = todoItem.querySelector(".delete");
      deleteButton.addEventListener("click", () => {
        savedTodos.splice(index, 1);
        saveToLocalStorage();
        renderTodos();
      });

      // Add the todo item to the list
      todoList.appendChild(todoItem);
    });
  };

  // Save todos to localStorage
  const saveToLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(savedTodos));
  };

  // Add new todo
  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent form submission

    // Get todo content and category
    const content = document.getElementById("content").value;
    const category = document.querySelector(
      'input[name="category"]:checked'
    ).value;

    if (!content || !category) {
      alert("Please fill out all fields!");
      return;
    }

    const newTodo = {
      content,
      category,
      completed: false,
    };

    // Add the new todo to the array
    savedTodos.push(newTodo);

    // Save and render todos
    saveToLocalStorage();
    renderTodos();

    // Clear the form fields
    form.reset();
  });

  // Initial render
  renderTodos();
});



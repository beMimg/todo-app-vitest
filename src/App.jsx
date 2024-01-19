import { useState } from "react";
import { TodoForm } from "./TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  function handleTodoSubmit(todoName) {
    setTodos((todos) => [
      ...todos,
      { name: todoName, id: crypto.randomUUID(), time: new Date() },
    ]);
  }

  function handleDelete(id) {
    const filtredArray = todos.filter((todo) => todo.id !== id);
    setTodos(filtredArray);
  }

  return (
    <>
      <TodoForm onSubmit={handleTodoSubmit}></TodoForm>
      <ul data-testid="todos-list">
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.name}
            <button
              onClick={(e) => handleDelete(todo.id)}
              data-testid={todo.name}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;

import { useState } from "react";
import { TodoForm } from "./TodoForm";

function App() {
  const [todos, setTodos] = useState([]);
  const [editTodoName, setEditTodoName] = useState();

  function handleTodoSubmit(todoName) {
    setTodos((todos) => [
      ...todos,
      {
        name: todoName,
        id: crypto.randomUUID(),
        time: new Date(),
        isBeingEdited: false,
      },
    ]);
  }

  function handleDelete(id) {
    const filtredArray = todos.filter((todo) => todo.id !== id);
    setTodos(filtredArray);
  }

  function turnEditOn(id) {
    if (todos.some((todo) => todo.isBeingEdited)) {
      return;
    } else {
      setTodos((prevTodos) => {
        return prevTodos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, isBeingEdited: true };
          } else {
            return todo;
          }
        });
      });
    }
  }

  function changeTodoName(e, id) {
    e.preventDefault();
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name: editTodoName, isBeingEdited: false };
        } else {
          return todo;
        }
      });
    });
    setEditTodoName("");
  }

  function cancelEdit(id) {
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isBeingEdited: false };
        } else {
          return todo;
        }
      });
    });
    setEditTodoName("");
  }

  return (
    <>
      <TodoForm onSubmit={handleTodoSubmit}></TodoForm>
      <ul data-testid="todos-list">
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.isBeingEdited ? (
              <form onSubmit={(e) => changeTodoName(e, todo.id)}>
                <input
                  type="text"
                  placeholder={todo.name}
                  value={editTodoName}
                  onChange={(e) => setEditTodoName(e.target.value)}
                />
                <button type="submit">Resubmit</button>
                <button type="button" onClick={() => cancelEdit(todo.id)}>
                  Cancel
                </button>
              </form>
            ) : (
              <>
                <li key={todo.id}>{todo.name}</li>
                <button
                  onClick={() => handleDelete(todo.id)}
                  data-testid={todo.name}
                >
                  Delete
                </button>
                <button onClick={() => turnEditOn(todo.id)}>Edit</button>
              </>
            )}
          </div>
        ))}
      </ul>
    </>
  );
}

export default App;

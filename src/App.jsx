import { useState } from "react";
import { TodoForm } from "./TodoForm";
import { EditForm } from "./EditForm";
import { TodoDisplay } from "./TodoDisplay";

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

  const isThereAnActiveEdit = todos.some((todo) => todo.isBeingEdited);

  return (
    <>
      <TodoForm onSubmit={handleTodoSubmit}></TodoForm>
      <div data-testid="todos-list" className="todos-list">
        {todos.map((todo) => (
          <div key={todo.id}>
            {todo.isBeingEdited ? (
              <EditForm
                onSubmit={changeTodoName}
                onChange={setEditTodoName}
                onClick={cancelEdit}
                todo={todo}
                editTodoName={editTodoName}
              ></EditForm>
            ) : (
              <TodoDisplay
                todo={todo}
                onDelete={handleDelete}
                onEdit={turnEditOn}
                isAvailable={isThereAnActiveEdit}
              ></TodoDisplay>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default App;

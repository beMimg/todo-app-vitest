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

  return (
    <>
      <TodoForm onSubmit={handleTodoSubmit}></TodoForm>
    </>
  );
}

export default App;

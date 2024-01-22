import { useState } from "react";

export function TodoForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label htmlFor="todo-name">Todo name:</label>
      <input
        type="text"
        value={inputValue}
        id="todo-name"
        name="todo-name"
        data-testid="input-element"
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

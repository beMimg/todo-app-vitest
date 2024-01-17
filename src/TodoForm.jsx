import { useState } from "react";

export function TodoForm({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(inputValue);
    setInputValue("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Todo name:</label>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

export function EditForm({ todo, editTodoName, onSubmit, onChange, onClick }) {
  return (
    <form className="edit-form" onSubmit={(e) => onSubmit(e, todo.id)}>
      <input
        type="text"
        placeholder={todo.name}
        value={editTodoName}
        onChange={(e) => onChange(e.target.value)}
        data-testid="edit-input"
      />
      <button className="resubmit-btn" type="submit">
        Resubmit
      </button>
      <button
        className="cancel-btn"
        type="button"
        onClick={() => onClick(todo.id)}
      >
        Cancel
      </button>
    </form>
  );
}

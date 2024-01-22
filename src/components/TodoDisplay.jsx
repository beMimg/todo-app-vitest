export function TodoDisplay({ todo, onDelete, onEdit, isAvailable }) {
  return (
    <div className="todo">
      <p key={todo.id}>{todo.name}</p>
      <button
        className="delete-btn"
        onClick={() => onDelete(todo.id)}
        data-testid={todo.name}
      >
        Delete
      </button>
      {isAvailable === false && (
        <button
          data-testid={`edit-${todo.name}`}
          onClick={() => onEdit(todo.id)}
          className="edit-btn"
        >
          Edit
        </button>
      )}
    </div>
  );
}

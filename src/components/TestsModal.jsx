import "../style/modal.css";

export function TestsModal({ onClose }) {
  return (
    <div className="modal">
      <div className="modal-container">
        <button className="close-modal-btn" onClick={onClose}>
          x
        </button>
        <p>
          Hello, I am{" "}
          <a href="https://github.com/beMimg" target="_blank">
            beMimg
          </a>{" "}
          and I created this mini app with the main purpose to showcase testing.
        </p>
        <p>
          You can checkout the repository{" "}
          <a
            href="https://github.com/beMimg/todo-app-vitest/blob/main/src/tests/App.test.jsx"
            target="_blank"
          >
            here
          </a>
          .
        </p>
        <a href="https://github.com/beMimg"></a>
      </div>
    </div>
  );
}

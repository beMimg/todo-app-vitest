import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "../TodoForm";

describe("App Component", () => {
  it("renders form", () => {
    const { container } = render(<App></App>);
    expect(container).toMatchSnapshot();
  });

  it("handleTodoSubmit updates todos array correctly", () => {
    const { container } = render(<App></App>);
  });
});

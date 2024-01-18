import { describe, it, expect } from "vitest";
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  render,
  screen,
} from "@testing-library/react";
import { TodoForm } from "../TodoForm";
import userEvent from "@testing-library/user-event";

describe("TodoForm Jsx", () => {
  it("should render a button to submit", () => {
    render(<TodoForm onSubmit={() => {}}></TodoForm>);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });

  it("input is empty when component mounts", () => {
    render(<TodoForm onSubmit={() => {}}></TodoForm>);

    const inputElement = screen.getByTestId("input-element");

    expect(inputElement.value).toBe("");
  });

  it("input change in todo form", async () => {
    render(<TodoForm onSubmit={() => {}}></TodoForm>);

    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });

    expect(inputElement.value).toBe("New Todo");
  });

  it("should call onSubmit function when clicked", async () => {
    const mockFn = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockFn}></TodoForm>);

    const button = screen.getByRole("button", { name: "Submit" });

    await user.click(button);

    expect(mockFn).toHaveBeenCalled();
  });

  it("should clear inputValue if form submitted", async () => {
    const mockFn = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockFn}></TodoForm>);

    const button = screen.getByRole("button", { name: "Submit" });
    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });

    await user.click(button);

    expect(mockFn).toHaveBeenCalled();

    expect(inputElement.value).toBe("");
  });
});

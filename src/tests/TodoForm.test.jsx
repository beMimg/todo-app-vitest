import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { TodoForm } from "../TodoForm";
import userEvent from "@testing-library/user-event";

describe("TodoForm Jsx", () => {
  it("should render a button to submit", () => {
    render(<TodoForm onSubmit={() => {}}></TodoForm>);

    const button = screen.getByRole("button", { name: "Submit" });

    expect(button).toBeInTheDocument();
  });

  it("input is empty when component mounts", () => {
    const { getByLabelText } = render(
      <TodoForm onSubmit={() => {}}></TodoForm>
    );

    const inputElement = getByLabelText("Todo name:");

    expect(inputElement.value).toBe("");
  });

  it("should call onSubmit function when clicked", async () => {
    const mockFn = vi.fn();
    const user = userEvent.setup();

    render(<TodoForm onSubmit={mockFn}></TodoForm>);

    const button = screen.getByRole("button", { name: "Submit" });

    await user.click(button);

    expect(mockFn).toHaveBeenCalled();
  });
});

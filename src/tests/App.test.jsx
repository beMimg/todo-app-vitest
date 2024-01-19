import { describe, it, expect, vi } from "vitest";
import {
  fireEvent,
  queryByText,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import App from "../App";
import userEvent from "@testing-library/user-event";
import { TodoForm } from "../TodoForm";

describe("App Component", () => {
  it("renders app", () => {
    const { container } = render(<App></App>);
    expect(container).toMatchSnapshot();
  });

  it("It displays todo when submited", async () => {
    const user = userEvent.setup();

    render(<App></App>);

    const button = screen.getByRole("button", { name: "Submit" });

    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });

    expect(screen.queryByText("New Todo")).toBeNull();

    user.click(button);

    await screen.findByText("New Todo");
    await waitFor(() => {
      expect(screen.queryByText("dsad")).toBeNull();
    });
  });
});

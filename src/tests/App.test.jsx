import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  findByText,
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

describe("App Component, handleDelete", () => {
  beforeEach(() => {
    const user = userEvent.setup();

    render(<App></App>);

    const button = screen.getByRole("button", { name: "Submit" });
    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });

    user.click(button);
  });

  it("displays the delete button", async () => {
    await screen.findByText("Delete");
  });

  it("not clicking delete will stil display todo", async () => {
    await waitFor(() => {
      expect(screen.getByText("New Todo")).toBeDefined();
    });
  });

  it("clicking delete will not display todo", async () => {
    const user = userEvent.setup();

    const deleteBtn = await screen.findByText("Delete");
    await user.click(deleteBtn);

    await waitFor(() => {
      expect(screen.queryByText("Delete")).toBeNull();
    });
  });
});

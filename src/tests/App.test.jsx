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

  it("Display the two todos created", async () => {
    const user = userEvent.setup();

    render(<App></App>);

    const button = screen.getByRole("button", { name: "Submit" });

    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });
    await user.click(button);

    fireEvent.change(inputElement, { target: { value: "newww" } });
    user.click(button);

    await screen.findByText("New Todo");
    await screen.findByText("newww");
    await waitFor(() => {
      expect(screen.queryByText("dsad")).toBeNull();
    });
  });
});

describe("App Component, Delete", () => {
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

  it("click delete, deletes the right todo", async () => {
    const user = userEvent.setup();

    const button = screen.getByRole("button", { name: "Submit" });

    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "2nd Todo" } });
    await user.click(button);

    fireEvent.change(inputElement, { target: { value: "3rd Todo" } });
    user.click(button);

    const deleteBtnTarget = screen.getByTestId("2nd Todo");

    await user.click(deleteBtnTarget);

    await waitFor(() => {
      expect(screen.queryByText("2nd Todo")).toBeNull();
      expect(screen.queryByText("3rd todo")).toBeDefined();
    });
  });
});

describe("App Component, Edit", () => {
  beforeEach(async () => {
    const user = userEvent.setup();

    render(<App></App>);

    const button = screen.getByRole("button", { name: "Submit" });

    const inputElement = screen.getByTestId("input-element");

    fireEvent.change(inputElement, { target: { value: "New Todo" } });

    await user.click(button);

    fireEvent.change(inputElement, { target: { value: "2nd Todo" } });

    await user.click(button);
  });

  it("displays two edit buttons", async () => {
    const editBtns = await screen.findAllByText("Edit");

    expect(editBtns).toHaveLength(2);
  });

  it("click on edit btn should remove all edit btns", async () => {
    const user = userEvent.setup();

    const editBtn = await screen.findByTestId("edit-New Todo");

    await user.click(editBtn);

    await waitFor(() => {
      expect(screen.queryByText("Edit")).toBeNull();
    });
  });

  it("click on edit btn should display input field, submit and cancel button", async () => {
    const user = userEvent.setup();

    const editBtn = await screen.findByTestId("edit-New Todo");

    await user.click(editBtn);

    await screen.findByTestId("edit-input");
    await screen.findByRole("button", { name: "Resubmit" });
    await screen.findByRole("button", { name: "Cancel" });
  });
});

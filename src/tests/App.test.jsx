import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "../App";

describe("App Component", () => {
  it("renders form", () => {
    const { container } = render(<App></App>);
    expect(container).toMatchSnapshot();
  });
});

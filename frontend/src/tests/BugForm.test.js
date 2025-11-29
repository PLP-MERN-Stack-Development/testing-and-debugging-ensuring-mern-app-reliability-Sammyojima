import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BugForm from "../BugForm";

describe("BugForm Component", () => {
  const mockAddBug = jest.fn();

  beforeEach(() => {
    mockAddBug.mockClear();
  });

  test("renders input fields and button", () => {
    render(<BugForm addBug={mockAddBug} />);
    expect(screen.getByPlaceholderText(/title/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/description/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("calls addBug with correct data on submit", async () => {
    render(<BugForm addBug={mockAddBug} />);

    const titleInput = screen.getByPlaceholderText(/title/i);
    const descriptionInput = screen.getByPlaceholderText(/description/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });

    userEvent.type(titleInput, "Test Bug");
    userEvent.type(descriptionInput, "This is a test bug");
    fireEvent.click(submitButton);

    expect(mockAddBug).toHaveBeenCalledWith({
      title: "Test Bug",
      description: "This is a test bug",
    });
  });

  test("does not call addBug if title or description is empty", () => {
    render(<BugForm addBug={mockAddBug} />);
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));
    expect(mockAddBug).not.toHaveBeenCalled();
  });
});

import { render, screen } from "@testing-library/react";
import BugList from "../BugList";

describe("BugList Component", () => {
  const bugs = [
    { _id: "1", title: "Bug 1", description: "Desc 1", status: "open" },
    { _id: "2", title: "Bug 2", description: "Desc 2", status: "resolved" },
  ];

  test("renders list of bugs", () => {
    render(<BugList bugs={bugs} />);
    expect(screen.getByText(/Bug 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Bug 2/i)).toBeInTheDocument();
  });

  test("renders empty message if no bugs", () => {
    render(<BugList bugs={[]} />);
    expect(screen.getByText(/no bugs reported/i)).toBeInTheDocument();
  });
});

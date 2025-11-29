import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import axios from "../__mocks__/axios";
import App from "../App";

jest.mock("axios");

describe("Bug Tracker Frontend Tests", () => {
  test("renders bug tracker title", () => {
    render(<App />);
    expect(screen.getByText(/Bug Tracker/i)).toBeInTheDocument();
  });

  test("fetches and displays bugs", async () => {
    axios.get.mockResolvedValue({
      data: [
        { _id: "1", title: "Sample Bug", description: "Test bug", priority: "high", status: "open" }
      ]
    });

    render(<App />);

    const bugItem = await screen.findByText("Sample Bug");
    expect(bugItem).toBeInTheDocument();
  });

  test("submits a new bug", async () => {
    axios.post.mockResolvedValue({});
    axios.get.mockResolvedValue({ data: [] });

    render(<App />);

    fireEvent.change(screen.getByPlaceholderText(/Bug title/i), {
      target: { value: "New Bug" }
    });

    fireEvent.change(screen.getByPlaceholderText(/Bug description/i), {
      target: { value: "Bug details" }
    });

    fireEvent.click(screen.getByText(/Submit Bug/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });

  test("updates bug status", async () => {
    axios.get.mockResolvedValue({
      data: [
        { _id: "1", title: "Bug A", description: "Desc", priority: "low", status: "open" }
      ]
    });

    axios.put.mockResolvedValue({
      data: { status: "resolved" }
    });

    render(<App />);

    const btn = await screen.findByText("Mark Resolved");
    fireEvent.click(btn);

    expect(axios.put).toHaveBeenCalled();
  });

  test("deletes a bug", async () => {
    axios.get.mockResolvedValue({
      data: [
        { _id: "1", title: "Bug A", description: "Test", priority: "medium", status: "open" }
      ]
    });

    axios.delete.mockResolvedValue({});

    render(<App />);

    const delBtn = await screen.findByText("Delete Bug");
    fireEvent.click(delBtn);

    expect(axios.delete).toHaveBeenCalled();
  });
});

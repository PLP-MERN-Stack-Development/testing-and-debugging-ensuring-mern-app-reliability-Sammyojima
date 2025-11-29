import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";

jest.mock("axios");

const mockBugs = [
  { _id: "1", title: "Bug 1", description: "Desc 1", status: "open" },
];

test("fetches and displays bugs from API", async () => {
  axios.get.mockResolvedValue({ data: mockBugs });

  render(<App />);

  await waitFor(() => expect(screen.getByText(/Bug 1/i)).toBeInTheDocument());
  expect(axios.get).toHaveBeenCalledWith("http://localhost:5000/api/bugs");
});

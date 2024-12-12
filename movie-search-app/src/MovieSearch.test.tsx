import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieSearch from "./MovieSearch";
import axios from "axios";

// Mock axios
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("MovieSearch Component", () => {
  it("should render search input and button", async () => {
    render(<MovieSearch onMoviesChange={jest.fn()} />);

    // Wait for the input element and button to be rendered
    await waitFor(() => {
      const inputElement = screen.getByPlaceholderText(
        /Search for a movie.../i
      );
      const buttonElement = screen.getByText(/Search/i);

      expect(inputElement).toBeInTheDocument();
      expect(buttonElement).toBeInTheDocument();
    });
  });

  it("should update the input value", () => {
    render(<MovieSearch onMoviesChange={jest.fn()} />);

    const inputElement = screen.getByPlaceholderText(/Search for a movie.../i);
    fireEvent.change(inputElement, { target: { value: "Inception" } });

    expect(inputElement).toHaveValue("Inception");
  });

  it("should call the API and handle successful search", async () => {
    const mockMoviesChange = jest.fn();
    render(<MovieSearch onMoviesChange={mockMoviesChange} />);

    mockedAxios.get.mockResolvedValueOnce({
      data: {
        Response: "True",
        Search: [
          {
            Title: "Inception",
            Year: "2010",
            imdbID: "tt1375666",
            Type: "movie",
            Poster: "http://example.com/inception.jpg",
          },
        ],
      },
    });

    const inputElement = screen.getByPlaceholderText(/Search for a movie.../i);
    fireEvent.change(inputElement, { target: { value: "Inception" } });
    const buttonElement = screen.getByText(/Search/i);
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockMoviesChange).toHaveBeenCalledWith(
        [
          {
            Title: "Inception",
            Year: "2010",
            imdbID: "tt1375666",
            Type: "movie",
            Poster: "http://example.com/inception.jpg",
          },
        ],
        ""
      );
    });
  });

  it("should handle API error", async () => {
    const mockMoviesChange = jest.fn();
    render(<MovieSearch onMoviesChange={mockMoviesChange} />);

    mockedAxios.get.mockResolvedValueOnce({
      data: { Response: "False", Error: "Movie not found!" },
    });

    const inputElement = screen.getByPlaceholderText(/Search for a movie.../i);
    fireEvent.change(inputElement, { target: { value: "Unknown Movie" } });
    const buttonElement = screen.getByText(/Search/i);
    fireEvent.click(buttonElement);

    await waitFor(() => {
      expect(mockMoviesChange).toHaveBeenCalledWith([], "Movie not found!");
    });
  });
});

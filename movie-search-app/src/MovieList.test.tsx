// src/MovieList.test.tsx

import { render, screen } from "@testing-library/react";
import MovieList from "./MovieList";

describe("MovieList Component", () => {
  it("should render movie cards correctly", () => {
    const mockMovies = [
      {
        Title: "Inception",
        Year: "2010",
        imdbID: "tt1375666",
        Type: "movie",
        Poster: "http://example.com/inception.jpg",
      },
    ];

    render(<MovieList movies={mockMovies} />);

    // Use regex to match the text more flexibly
    expect(screen.getByText(/2010/)).toBeInTheDocument();
    expect(screen.getByText(/Inception/)).toBeInTheDocument();
  });
});

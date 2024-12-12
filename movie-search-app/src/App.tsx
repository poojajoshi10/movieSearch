import React, { useState } from "react";
import MovieSearch from "./MovieSearch";
import MovieList from "./MovieList";
import { Movie } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");

  const handleMoviesChange = (movies: Movie[], error: string) => {
    setMovies(movies);
    setError(error);
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <MovieSearch onMoviesChange={handleMoviesChange} />
      {error && <p className="error">{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default App;

// Install dependencies: react, react-dom, typescript, @types/react, @types/react-dom
// Also install axios: npm install axios

import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const API_KEY = "531bdf3b";
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      setError("Please enter a movie title to search.");
      return;
    }

    try {
      setError("");
      const response = await axios.get(API_URL, {
        params: {
          s: searchTerm,
        },
      });
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setError(response.data.Error);
        setMovies([]);
      }
    } catch (err) {
      setError("An error occurred while fetching the data.");
    }
  };

  return (
    <div className="app">
      <h1>Movie Search App</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="movie-card">
            <img
              src={
                movie.Poster !== "N/A"
                  ? `http://img.omdbapi.com/?apikey=${API_KEY}&i=${movie.imdbID}`
                  : "placeholder.jpg"
              }
              alt={movie.Title}
            />
            <div className="movie-info">
              <h3>{movie.Title}</h3>
              <p>Year: {movie.Year}</p>
              <p>Type: {movie.Type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

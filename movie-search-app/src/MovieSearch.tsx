import React, { useState } from "react";
import { Movie } from "./types";
import axios from "axios";

const API_KEY = "531bdf3b";
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}&`;

interface MovieSearchProps {
  onMoviesChange: (movies: Movie[], error: string) => void;
}

const MovieSearch: React.FC<MovieSearchProps> = ({ onMoviesChange }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  const handleSearch = async () => {
    if (!searchTerm.trim()) {
      onMoviesChange([], "Please enter a movie title to search.");
      return;
    }

    try {
      const response = await axios.get(API_URL, {
        params: { s: searchTerm },
      });
      if (response.data.Response === "True") {
        onMoviesChange(response.data.Search, "");
      } else {
        onMoviesChange([], response.data.Error);
      }
    } catch (err: any) {
      onMoviesChange([], "An error occurred while fetching the data.");
    }
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search for a movie..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default MovieSearch;

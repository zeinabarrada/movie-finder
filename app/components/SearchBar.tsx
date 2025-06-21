"use client";
import "../styles/searchbar.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import type { Movie } from "../types/movie";
import Link from "next/link";
import Image from "next/image";
export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const router = useRouter();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  useEffect(() => {
    async function searchMovies() {
      if (searchInput.length === 0) {
        setSuggestions([]);
        return;
      }
      console.log(searchInput);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=f4739c9734c4222661bd2e125f79b094&query=${searchInput}`
        );
        const data = (await response.json()) as {
          results: Movie[];
        };
        setSuggestions(data.results.slice(0, 6));
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    if (searchInput) {
      searchMovies();
    }
    return setSuggestions([]);
  }, [searchInput]);

  function handleSearch() {
    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
  }
  return (
    <div className="container">
      <input
        type="text"
        className="search-input"
        placeholder="Enter a movie name.."
        value={searchInput}
        onChange={handleInputChange}
      />
      <button className="search-button" onClick={handleSearch}>
        Search
      </button>
      {suggestions.length > 0 && (
        <ul className="suggestions-list">
          {suggestions.map((movie) => {
            return (
              <li className="suggestion-item" key={movie.id}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

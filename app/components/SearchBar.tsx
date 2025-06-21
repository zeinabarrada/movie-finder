"use client";
import "../styles/searchbar.css";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import type { ChangeEvent } from "react";
import type { Movie } from "../types/movie";
import Link from "next/link";
import Image from "next/image";
import SuggestionsList from "./SuggestionsList";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const router = useRouter();
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
    setShowSuggestions(true);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSuggestions([]);
        setShowSuggestions(false);
      }
    }
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
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      setSuggestions([]);
    };
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
      <div ref={suggestionsRef}>
        {showSuggestions && (
          <SuggestionsList
            searchInput={searchInput}
            suggestions={suggestions}
          />
        )}
      </div>
    </div>
  );
}

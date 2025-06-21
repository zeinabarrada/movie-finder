"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import Link from "next/link";
export default function Page() {
  const params = useSearchParams();
  const query = params.get("query");
  const [results, setResults] = useState<any[]>([]);
  useEffect(() => {
    async function fetchResults() {
      if (!query) return;
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=f4739c9734c4222661bd2e125f79b094&query=${query}`
        );
        const data = (await response.json()) as {
          results: Movie[];
        };
        setResults(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchResults();
  }, [query]);
  return (
    <div>
      <h1>Search Results for: {query}</h1>
      {results.map((movie) => (
        <div key={movie.id} style={{ marginBottom: "20px" }}>
          <Link href={`/movie/${movie.id}`}>
            <h3>{movie.title}</h3>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
            )}
          </Link>
        </div>
      ))}
    </div>
  );
}

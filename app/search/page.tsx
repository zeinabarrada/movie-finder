"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Movie } from "../types/movie";
import Link from "next/link";
import Image from "next/image";
import "../styles/movies.css";
import image from "../image.png";
import FavoriteButton from "../components/FavoriteButton";
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
    <div className="movie-conainer">
      <h1 className="page-title">Search Results for: {query}</h1>

      <div className="movie-card">
        {results.map((movie) => (
          <div key={movie.id} className="list-item">
            <FavoriteButton movie={movie} />
            <Link href={`/movie/${movie.id}`}>
              {movie.poster_path && (
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      : image
                  }
                  alt={movie.title}
                  width={200}
                  height={250}
                />
              )}
              <h4 className="movie-title">{movie.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

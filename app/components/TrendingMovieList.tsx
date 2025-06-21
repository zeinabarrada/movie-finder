"use client";
import "../styles/trendingmovies.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Movie } from "../types/movie";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import Loading from "../loading";
export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=f4739c9734c4222661bd2e125f79b094"
        );
        const data = (await response.json()) as {
          results: Movie[];
        };
        setTrendingMovies(data.results);
        console.log(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    fetchTrendingMovies();
  }, []);
  if (loading) return <Loading />;
  return (
    <div className="container">
      <h2>Trending Movies</h2>
      <div className="grid">
        {trendingMovies.map((movie) => (
          <div className="card" key={movie.id}>
            <FavoriteButton movie={movie} />
            <Link href={`/movie/${movie.id}`}>
              <div className="image-container">
                <Image
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="movie-poster"
                  width="100"
                  height="100"
                />
              </div>
              <div className="card-details">
                <h3>{movie.title}</h3>
                <p>Rating: ⭐ {movie.vote_average}</p>
                <p>Release: {movie.release_date}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

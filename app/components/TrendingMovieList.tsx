"use client";
import "../styles/trendingmovies.css";
import { useEffect, useState } from "react";
import { Movie } from "../types/movie";
export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  useEffect(() => {
    async function fetchTrendingMovies() {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/trending/movie/day?api_key=f4739c9734c4222661bd2e125f79b094"
        );
        const data: { results: Movie[] } = await response.json();
        setTrendingMovies(data.results);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchTrendingMovies();
  }, []);

  return (
    <div className="container">
      <h2>Trending Movies</h2>
      <div className="grid">
        {trendingMovies.map((movie) => (
          <div className="card" key={movie.id}>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="movie-poster"
            />
            <div className="card-details">
              <h3>{movie.title}</h3>
              <p>Rating: ⭐ {movie.vote_average}</p>
              <p>Release: {movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

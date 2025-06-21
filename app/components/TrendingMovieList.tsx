"use client";
import "../styles/trendingmovies.css";
import { useEffect, useState } from "react";
import Link from "next/link";
import type { Movie } from "../types/movie";
import FavoriteButton from "./FavoriteButton";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Loading from "../loading";

export default function TrendingMovies() {
  const [trendingMovies, setTrendingMovies] = useState<any>([]);
  const [selectedMovie, setSelectedMovie] = useState<any>([]);
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
        setSelectedMovie(data.results[0]);
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
    <div className="swiper-container">
      <div className="backdrop-image">
        <Image
          src={`https://image.tmdb.org/t/p/original${selectedMovie.backdrop_path}`}
          alt={selectedMovie.title}
          fill
          sizes="100vw"
          className="backdrop-img"
        />
        <div className="gradient-overlay"></div>
        <div className="backdrop-content">
          <h1 className="movie-title">{selectedMovie.title}</h1>
          <div className="movie-meta">
            <span>⭐ {selectedMovie.vote_average.toFixed(1)}</span>
            <span>|</span>
            <span>{selectedMovie.release_date.split("-")[0]}</span>
          </div>
          <p className="overview">{selectedMovie.overview}</p>
          <div className="trending-actions">
            <Link href={`/movie/${selectedMovie.id}`}>
              <button className="watch-button">View Details</button>
            </Link>
            <FavoriteButton movie={selectedMovie} />
          </div>
        </div>
        <div className="poster-row">
          {trendingMovies.map((movie: any) => (
            <div
              className="poster-card"
              key={movie.id}
              onClick={() => setSelectedMovie(movie)}
            >
              <Image
                src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                alt={movie.title}
                width={100}
                height={150}
                className="poster-img"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

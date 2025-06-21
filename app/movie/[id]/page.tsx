"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../../loading";
import "../../styles/movie-details.css";
export default function MovieDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [movie, setMovie] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchMovie = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=f4739c9734c4222661bd2e125f79b094&append_to_response=credits`
      );
      const data = await response.json();
      setMovie(data);
      console.log(movie);
      setLoading(false);
    };

    fetchMovie();
  }, [id]);

  if (loading) return <Loading />;
  //handle errors
  if (!movie || movie.success === false) return <p>Movie not found</p>;
  const director = movie.credits.crew.find(
    (person: any) => person.job === "Director"
  );

  return (
    <div className="movie-details-container">
      {movie.backdrop_path && (
        <div
          className="backdrop-image"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.9) 20%, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0.3) 70%, rgba(0, 0, 0, 0) 100%), url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
          }}
        >
          <div className="backdrop-content">
            <h1 className="movie-title">{movie.title}</h1>
            <div className="movie-meta">
              <span>{movie.vote_average.toFixed(1)}</span>
              <span>|</span>
              <span>{movie.release_date.split("-")[0]}</span>
              <span>|</span>
              <span>{movie.runtime} mins</span>
              <span>|</span>
              <span>
                {movie.genres.map((genre: any) => genre.name).join(", ")}
              </span>
            </div>
            <p className="overview">{movie.overview}</p>
          </div>
        </div>
      )}
      <div className="content-wrapper">
        <div className="main-content">
          <div className="overview"></div>
          <div className="credits">
            <div className="credit-item">
              <h3>Director</h3>
              <p>{director ? director.name : "N/A"}</p>
            </div>

            <div className="credit-item">
              <h3>Cast</h3>
              <p>
                {movie.credits.cast
                  .slice(0, 5)
                  .map((actor: any) => actor.name)
                  .join(", ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

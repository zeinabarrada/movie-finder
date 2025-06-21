"use client";
import FavoriteButton from "../components/FavoriteButton";
import { useFavoritesStore } from "../store/favoritesStore";
import Image from "next/image";
import "../styles/movies.css";
import Link from "next/link";
import image from "../image.png";
export default function Page() {
  const { favorites } = useFavoritesStore();

  return (
    <div className="movies-container">
      <h1 className="page-title">Favorites</h1>
      <div className="movie-card">
        {favorites.map((fav) => (
          <div key={fav.id} className="list-item">
            <FavoriteButton movie={fav} />
            <Link href={`/movie/${fav.id}`}>
              <Image
                src={
                  fav.poster_path
                    ? `https://image.tmdb.org/t/p/w500${fav.poster_path}`
                    : image
                }
                alt={fav.title}
                width={200}
                height={250}
                className="movie-poster"
              />
              <h4 className="movie-title">{fav.title}</h4>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

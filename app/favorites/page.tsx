"use client";
import FavoriteButton from "../components/FavoriteButton";
import { useFavoritesStore } from "../store/favoritesStore";
import Image from "next/image";

export default function Page() {
  const { favorites } = useFavoritesStore();

  return (
    <div>
      <h1>Favorites</h1>
      <ul>
        {favorites.map((fav) => (
          <li
            key={fav.id}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${fav.poster_path}`}
              alt={fav.title}
              className="movie-poster"
            />
            <FavoriteButton movie={fav} />
          </li>
        ))}
      </ul>
    </div>
  );
}

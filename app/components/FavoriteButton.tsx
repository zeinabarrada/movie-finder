"use client";
import type { Movie } from "../types/movie";
import { Heart } from "lucide-react";

import { useFavoritesStore } from "../store/favoritesStore";
import { useState } from "react";
export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = favorites.some((favorite) => favorite.id === movie.id);
  const [animate, setAnimate] = useState(false);
  return (
    <button
      className="favorite-button"
      onClick={() => {
        if (favorited) {
          removeFavorite(movie.id);
        } else addFavorite(movie);

        setAnimate(true);
        setTimeout(() => setAnimate(false), 200);
      }}
    >
      <Heart
        className={animate ? "animate" : ""}
        color={favorited ? "#f44336" : "#ccc"}
        fill={favorited ? "#f44336" : "none"}
        size={24}
      />
    </button>
  );
}

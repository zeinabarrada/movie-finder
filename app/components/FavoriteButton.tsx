"use client";
import type { Movie } from "../types/movie";
import { Heart } from "lucide-react";

import { useFavoritesStore } from "../store/favoritesStore";
export default function FavoriteButton({ movie }: { movie: Movie }) {
  const { favorites, addFavorite, removeFavorite } = useFavoritesStore();
  const favorited = favorites.some((favorite) => favorite.id === movie.id);
  return (
    <button
      onClick={() => {
        if (favorited) {
          removeFavorite(movie.id);
        } else addFavorite(movie);
      }}
    >
      <Heart
        color={favorited ? "red" : "gray"}
        fill={favorited ? "red" : "none"}
        size={28}
      />
    </button>
  );
}

import { create } from "zustand";
import type { Movie } from "../types/movie";
import { persist } from "zustand/middleware";
type FavoritesState = {
  favorites: Movie[];
  addFavorite: (movie: Movie) => void;
  removeFavorite: (id: number) => void;
};
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set) => ({
      favorites: [],
      addFavorite: (movie) =>
        set((state) => ({
          favorites: [...state.favorites, movie],
        })),
      removeFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.filter((movie) => movie.id !== id),
        })),
    }),
    {
      name: "favorites-storage",
    }
  )
);

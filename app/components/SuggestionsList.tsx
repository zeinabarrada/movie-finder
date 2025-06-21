import Image from "next/image";
import Link from "next/link";
import type { Movie } from "../types/movie";
import image from "../image.png";
type SuggestionsListProps = {
  suggestions: Movie[];
  searchInput: string;
};

export default function SuggestionsList({
  suggestions,
  searchInput,
}: SuggestionsListProps) {
  if (searchInput.trim() === "") {
    return null;
  }
  return (
    <div>
      {suggestions.length > 0 ? (
        <ul className="suggestions-list">
          {suggestions.map((movie: Movie) => {
            return (
              <li className="suggestion-item" key={movie.id}>
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : image
                  }
                  alt={movie.title}
                  width={50}
                  height={60}
                  className="poster-image"
                />
                <Link href={`/movie/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="no-suggestions">
          <p>There isn't any movie with this name.</p>
        </div>
      )}
    </div>
  );
}

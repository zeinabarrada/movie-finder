import SearchBar from "./components/SearchBar";
import TrendingMovies from "./components/TrendingMovieList";

export default async function HomePage() {
  return (
    <div>
      <h1>🎬 Welcome to MovieFinder</h1>
      <SearchBar />
      <TrendingMovies />
    </div>
  );
}

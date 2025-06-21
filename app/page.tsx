import SearchBar from "./components/SearchBar";
import TrendingMovies from "./components/TrendingMovieList";
import "./styles/app.css";
import "../app/styles/searchbar.css";

export default async function HomePage() {
  return (
    <div>
      <TrendingMovies />
    </div>
  );
}

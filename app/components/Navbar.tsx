import Link from "next/link";
import "../styles/navbar.css";
export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/"> Movie Finder</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}

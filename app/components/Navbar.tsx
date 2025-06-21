"use client";
import Link from "next/link";
import "../styles/navbar.css";
import { useState } from "react";
import SearchBar from "./SearchBar";
export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);

  <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
    ☰
  </div>;
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <Link href="/"> Movie Finder</Link>
        </div>
      </div>
      <div className="navbar-center">
        <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-center">
        <SearchBar />
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
      </div>
    </nav>
  );
}

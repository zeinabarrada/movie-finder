"use client";
import Link from "next/link";
import "../styles/navbar.css";
import { useState } from "react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
    ☰
  </div>;
  return (
    <nav className="navbar">
      <div className="logo">
        <Link href="/"> Movie Finder</Link>
      </div>
      <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </div>

      <ul className={`navbar-links ${isOpen ? "open" : ""}`}>
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

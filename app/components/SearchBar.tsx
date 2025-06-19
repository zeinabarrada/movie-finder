"use client";
import "../styles/searchbar.css";
import { useState } from "react";

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  return (
    <div className="container">
      <input type="text" className="input" placeholder="Enter a movie name.." />
    </div>
  );
}

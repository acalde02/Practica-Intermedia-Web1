import React from "react";
import "../Styles/MarvelNavbar.css";

export default function MarvelNavbar({ onSearch, onToggleFavorites }) {
  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    onSearch(searchTerm); // Llama a la función onSearch del componente padre
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
          alt="Marvel Comics Logo"
          className="logo"
        />
      </div>
      <input
        type="text"
        placeholder="Buscar cómic..."
        onChange={handleSearchChange} // Actualiza el término de búsqueda en tiempo real
        className="search-input"
      />
      <button onClick={onToggleFavorites} className="favorites-button">
        Favoritos
      </button>
    </nav>
  );
}

import React, { useState, useEffect } from "react";
import MarvelNavbar from "./Components/MarvelNavbar";
import MarvelComics from "./Components/MarvelComics";
import FavoritesModal from "./Components/FavoritesModal";
import "./App.css";

function App() {
  const [favorites, setFavorites] = useState(() => {
    // Carga favoritos desde localStorage al inicializar el estado
    try {
      const savedFavorites = JSON.parse(localStorage.getItem("favorites"));
      return Array.isArray(savedFavorites) ? savedFavorites : [];
    } catch (error) {
      console.error("Error al cargar favoritos desde localStorage:", error);
      return [];
    }
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);

  // Guarda favoritos en localStorage cada vez que cambien
  useEffect(() => {
    try {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    } catch (error) {
      console.error("Error al guardar favoritos en localStorage:", error);
    }
  }, [favorites]);


  // Función para manejar el término de búsqueda
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Alterna la visibilidad del modal de favoritos
  const toggleFavoritesModal = () => {
    setShowFavoritesModal(!showFavoritesModal);
  };

  // Función para agregar o eliminar un cómic de favoritos
  const toggleFavorite = (comic) => {
    const minimalComic = {
      id: comic.id,
      title: comic.title,
      thumbnail: `${comic.thumbnail.path}.${comic.thumbnail.extension}`,
    };

    const updatedFavorites = favorites.some((fav) => fav.id === comic.id)
      ? favorites.filter((fav) => fav.id !== comic.id) // Elimina si ya está en favoritos
      : [...favorites, minimalComic]; // Agrega si no está en favoritos

    setFavorites(updatedFavorites);
  };

  // Verifica si un cómic está en favoritos
  const isFavorite = (comicId) => {
    return favorites.some((fav) => fav.id === comicId);
  };

  return (
    <div>
      <MarvelNavbar onSearch={handleSearch} onToggleFavorites={toggleFavoritesModal} />
      <MarvelComics
        searchTerm={searchTerm}
        toggleFavorite={toggleFavorite}
        isFavorite={isFavorite}
      />
      {showFavoritesModal && (
        <FavoritesModal favorites={favorites} onClose={toggleFavoritesModal} />
      )}
    </div>
  );
}

export default App;

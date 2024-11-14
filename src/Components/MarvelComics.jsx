import React, { useEffect, useState } from "react";
import CryptoJS from "crypto-js";
import ComicModal from "./ComicModal";
import "../Styles/MarvelComics.css";

export default function MarvelComics({ searchTerm, toggleFavorite, isFavorite }) {
  const [comics, setComics] = useState([]);
  const [filteredComics, setFilteredComics] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedComic, setSelectedComic] = useState(null);

  const privateApi = "0f5e4c23ecaac59ff6f160f7138cb02604621e97";
  const publicApi = "baaafcca17bd253a0adedea9d49da0ac";
  const url = "https://gateway.marvel.com:443/v1/public/comics";
  const ts = 1;

  const hash = CryptoJS.MD5(ts + privateApi + publicApi).toString();
  const FinalURL = `${url}?orderBy=modified&apikey=${publicApi}&ts=${ts}&hash=${hash}`;

  useEffect(() => {
    fetch(FinalURL)
      .then((response) => response.json())
      .then((data) => {
        setComics(data.data.results);
        setLoading(false);
      })
      .catch((error) => setError(error.message));
  }, [FinalURL]);

  useEffect(() => {
    if (searchTerm) {
      setFilteredComics(
        comics.filter((comic) =>
          comic.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } else {
      setFilteredComics(comics);
    }
  }, [searchTerm, comics]);

  const handleImageClick = (comic) => {
    setSelectedComic(comic);
  };

  const closeModal = () => {
    setSelectedComic(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="marvelComicsContainer">
      <h1>Bienvenido. Encuentra tus comics favoritos aqui</h1>
      <div className="comicsGrid">
        {filteredComics.map((comic) => (
          <div key={comic.id} className="containerComic">
            <h2>{comic.title}</h2>
            <img
              src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
              alt={comic.title}
              onClick={() => handleImageClick(comic)}
              className="comicImage"
            />
            <button
              onClick={() => toggleFavorite(comic)}
              className="favoriteButton"
            >
              {isFavorite(comic.id) ? "★ Favorito" : "☆ Agregar a Favoritos"}
            </button>
          </div>
        ))}
      </div>

      {selectedComic && (
        <ComicModal
          comic={selectedComic}
          onClose={closeModal}
          toggleFavorite={toggleFavorite}
          isFavorite={isFavorite}
        />
      )}
    </div>
  );
}

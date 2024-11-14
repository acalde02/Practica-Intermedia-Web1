import React, { useState, useEffect } from "react";
import "../Styles/ComicModal.css";
import CryptoJS from "crypto-js";

// Limpia etiquetas HTML del texto
const stripHtml = (html) => {
  if (!html) return "";
  return html.replace(/<[^>]*>/g, "");
};

export default function ComicModal({ comic, onClose, isFavorite, toggleFavorite }) {
  const [characterImages, setCharacterImages] = useState([]); // Almacena las imágenes de los personajes

  const privateApi = "0f5e4c23ecaac59ff6f160f7138cb02604621e97";
  const publicApi = "baaafcca17bd253a0adedea9d49da0ac";
  const ts = 1;
  const hash = CryptoJS.MD5(ts + privateApi + publicApi).toString();

  useEffect(() => {
    // Cargar imágenes de los personajes
    const fetchCharacterImages = async () => {
      const images = await Promise.all(
        comic.characters.items.map(async (character) => {
          try {
            const response = await fetch(`${character.resourceURI}?apikey=${publicApi}&ts=${ts}&hash=${hash}`);
            const data = await response.json();
            const characterData = data.data.results[0];
            return {
              name: characterData.name,
              thumbnail: `${characterData.thumbnail.path}.${characterData.thumbnail.extension}`,
            };
          } catch (error) {
            console.error("Error fetching character details:", error);
            return null;
          }
        })
      );
      setCharacterImages(images.filter(Boolean)); // Filtra resultados nulos en caso de errores
    };

    fetchCharacterImages();
  }, [comic, publicApi]);

  if (!comic) return null;

  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <img
          src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
          alt={comic.title}
          className="modalImage"
        />

        <div className="comicInfo">
          <h2>{stripHtml(comic.title)}</h2>
          <p>
            <strong>Descripción:</strong>{" "}
            {stripHtml(comic.description) || "Sin descripción disponible."}
          </p>
          <p>
            <strong>Páginas:</strong> {comic.pageCount || "No especificado"}
          </p>

          <p>
            <strong>Personajes:</strong>
          </p>
          <div className="characterGrid">
            {characterImages.length > 0 ? (
              characterImages.map((character, index) => (
                <div key={index} className="characterItem">
                  <img
                    src={character.thumbnail}
                    alt={character.name}
                    className="characterImage"
                  />
                  <p>{character.name}</p>
                </div>
              ))
            ) : (
              <p>Sin personajes disponibles</p>
            )}
          </div>

          <button
            onClick={() => toggleFavorite(comic)}
            className="favoriteButton"
          >
            {isFavorite(comic.id) ? "★ Favorito" : "☆ Agregar a Favoritos"}
          </button>
        </div>
      </div>
    </div>
  );
}

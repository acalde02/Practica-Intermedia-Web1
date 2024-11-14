import "../Styles/FavoritesModal.css";

export default function FavoritesModal({ favorites, onClose }) {
  // Si no hay favoritos, muestra un mensaje
  if (!favorites || !Array.isArray(favorites) || favorites.length === 0) {
    return (
      <div className="modalOverlay" onClick={onClose}>
        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
          <button className="closeButton" onClick={onClose}>
            &times;
          </button>
          <h2>Favoritos</h2>
          <p className="NoComics">No tienes cómics en favoritos.</p>
        </div>
      </div>
    );
  }

  // Renderiza la lista de favoritos con sus imágenes y títulos solamente
  return (
    <div className="modalOverlay" onClick={onClose}>
      <div className="modalContent" onClick={(e) => e.stopPropagation()}>
        <button className="closeButton" onClick={onClose}>
          &times;
        </button>
        <h2>Favoritos</h2>
        <ul className="favoritesList">
          {favorites.map((comic) => (
            <li key={comic.id} className="favoriteItem">
              <img
                src={comic.thumbnail}
                alt={comic.title}
                className="favoriteImage"
              />
              <h3>{comic.title}</h3>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

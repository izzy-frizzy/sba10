import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";

export default function RecipeCard({ id, name, thumb }) {
  const { isFavorite } = useFavorites();
  return (
    <Link to={`/recipe/${id}`} className="card">
      <img src={`${thumb}/preview`} alt={name} loading="lazy" />
      <div className="card-body">
        <h3>{name}</h3>
        {isFavorite(id) && <span className="tag">Saved</span>}
      </div>
    </Link>
  );
}
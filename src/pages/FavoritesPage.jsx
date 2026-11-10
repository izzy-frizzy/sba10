import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoriteContext";
import useFetch from "../hooks/useFetch";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

// Favorites are stored as IDs only, so each card looks up its own recipe.
function FavoriteItem({ id }) {
  const { data, loading, error } = useFetch(`/lookup.php?i=${id}`);
  if (loading) return <Spinner label="" />;
  if (error) return <ErrorMessage message={error} />;
  const meal = data?.meals?.[0];
  if (!meal) return null;
  return (
    <RecipeCard
      id={meal.idMeal}
      name={meal.strMeal}
      thumb={meal.strMealThumb}
    />
  );
}

export default function Favorites() {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="state">
        <h1>No favorites yet</h1>
        <p>Open a recipe and choose "Add to Favorites" to keep it here.</p>
        <Link className="btn" to="/">
          Browse recipes
        </Link>
      </div>
    );
  }
  return (
    <>
      <h1 className="title">Your favorites</h1>
      <div className="grid">
        {favorites.map((id) => (
          <FavoriteItem key={id} id={id} />
        ))}
      </div>
    </>
  );
}

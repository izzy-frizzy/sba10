import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { useFavorites } from "../context/FavoriteContext";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

// The API returns strIngredient1..20 / strMeasure1..20 – collapse into an array.
function getIngredients(meal) {
  const list = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]?.trim();
    if (name) list.push({ name, measure: meal[`strMeasure${i}`]?.trim() });
  }
  return list;
}

export default function RecipeDetail() {
  const { recipeId } = useParams();
  const { data, loading, error } = useFetch(`/lookup.php?i=${recipeId}`);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  if (loading) return <Spinner label="Loading recipe…" />;
  if (error) return <ErrorMessage message={error} />;

  const meal = data?.meals?.[0];
  if (!meal) return <div className="state"><h2>Recipe not found</h2><Link className="btn" to="/">Browse categories</Link></div>;

  const saved = isFavorite(meal.idMeal);

  return (
    <article className="detail">
      <Link to={`/category/${meal.strCategory}`} className="back">← {meal.strCategory}</Link>
      <div className="detail-head">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <div>
          <h1 className="title">{meal.strMeal}</h1>
          <p className="lede">{meal.strArea} cuisine</p>
          <button
            className={`btn ${saved ? "btn-danger" : ""}`}
            onClick={() => (saved ? removeFavorite(meal.idMeal) : addFavorite(meal.idMeal))}
          >
            {saved ? "Remove from Favorites" : "Add to Favorites"}
          </button>
          {meal.strYoutube && (
            <p><a href={meal.strYoutube} target="_blank" rel="noreferrer">Watch on YouTube</a></p>
          )}
        </div>
      </div>
      <div className="detail-body">
        <section>
          <h2>Ingredients</h2>
          <ul className="ingredients">
            {getIngredients(meal).map((ing) => (
              <li key={ing.name}><strong>{ing.measure}</strong> {ing.name}</li>
            ))}
          </ul>
        </section>
        <section>
          <h2>Instructions</h2>
          {meal.strInstructions.split(/\r?\n/).filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
        </section>
      </div>
    </article>
  );
}
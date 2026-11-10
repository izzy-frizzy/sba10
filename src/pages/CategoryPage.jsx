import { useParams, Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function CategoryPage() {
  const { categoryName } = useParams();
  const { data, loading, error } = useFetch(`/filter.php?c=${encodeURIComponent(categoryName)}`);

  if (loading) return <Spinner label={`Loading ${categoryName} recipes…`} />;
  if (error) return <ErrorMessage message={error} />;

  const meals = data?.meals ?? [];
  return (
    <>
      <Link to="/" className="back">← All categories</Link>
      <h1 className="title">{categoryName}</h1>
      {meals.length === 0 ? (
        <div className="state"><p>No recipes found in this category.</p></div>
      ) : (
        <div className="grid">
          {meals.map((m) => (
            <RecipeCard key={m.idMeal} id={m.idMeal} name={m.strMeal} thumb={m.strMealThumb} />
          ))}
        </div>
      )}
    </>
  );
}
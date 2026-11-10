import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import RecipeCard from "../components/RecipeCard";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function SearchResults() {
  const [params] = useSearchParams();
  const query = params.get("query")?.trim() ?? "";
  const { data, loading, error } = useFetch(query ? `/search.php?s=${encodeURIComponent(query)}` : null);

  if (!query) return <div className="state"><p>Type a recipe name in the search bar.</p></div>;
  if (loading) return <Spinner label={`Searching for "${query}"…`} />;
  if (error) return <ErrorMessage message={error} />;

  const meals = data?.meals ?? [];
  return (
    <>
      <h1 className="title">Results for "{query}"</h1>
      {meals.length === 0 ? (
        <div className="state"><p>No recipes match that name. Try a shorter or different search.</p></div>
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
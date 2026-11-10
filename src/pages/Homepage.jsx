import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Spinner from "../components/Spinner";
import ErrorMessage from "../components/ErrorMessage";

export default function Home() {
  const { data, loading, error } = useFetch("/categories.php");
  if (loading) return <Spinner label="Loading categories…" />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <>
      <h1 className="title">What are you cooking tonight?</h1>
      <p className="lede">Pick a category to browse recipes.</p>
      <div className="grid">
        {data.categories.map((c) => (
          <Link key={c.idCategory} to={`/category/${c.strCategory}`} className="card category">
            <img src={c.strCategoryThumb} alt="" loading="lazy" />
            <div className="card-body">
              <h3>{c.strCategory}</h3>
              <p>{c.strCategoryDescription.slice(0, 90)}…</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
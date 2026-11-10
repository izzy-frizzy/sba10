import { Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Homepage";
import CategoryPage from "./pages/CategoryPage";
import RecipeDetail from "./pages/RecipeDetailsPage";
import Favorites from "./pages/FavoritesPage";
import SearchResults from "./pages/SearchResults";

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/recipe/:recipeId" element={<RecipeDetail />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/search" element={<SearchResults />} />
          <Route
            path="*"
            element={
              <div className="state">
                <h1>Page not found</h1>
                <Link className="btn" to="/">Back to categories</Link>
              </div>
            }
          />
        </Routes>
      </main>
    </>
  );
}
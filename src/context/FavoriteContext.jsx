import { createContext, useContext, useCallback, useMemo } from "react";
import useLocalStorage from "../hooks/UseLocalStorage";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage("favorite-recipes", []);

  const addFavorite = useCallback(
    (id) => setFavorites((prev) => (prev.includes(id) ? prev : [...prev, id])),
    [setFavorites]
  );
  const removeFavorite = useCallback(
    (id) => setFavorites((prev) => prev.filter((f) => f !== id)),
    [setFavorites]
  );
  const isFavorite = useCallback((id) => favorites.includes(id), [favorites]);

  const value = useMemo(
    () => ({ favorites, addFavorite, removeFavorite, isFavorite }),
    [favorites, addFavorite, removeFavorite, isFavorite]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites must be used inside <FavoritesProvider>");
  return ctx;
}
import { useEffect, useState, useContext } from "react";
import { Recipe } from "../lib/Models/Recipe";
import { RecipeContext } from "../context/RecipesContext";

const apiUrl = new URL(import.meta.env.VITE_API_URL + "/recipes");

export function useRecipes() {
  const [recipes, setRecipes] = useState<Recipe[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRecipes = () => {
    const controller = new AbortController();
    const signal = controller.signal;

    try {
      const response = fetch(apiUrl, { method: "GET", signal });

      response.then(
        (results) => {
          results.json().then((recipes) => {
            setRecipes(recipes);
          });
          setLoading(false);
        },
        (error) => {
          if (error.name !== "AbortError") {
            setError(error);
            throw new Error(`[fetchRecipes ERROR] ${error}`);
          }
        }
      );
    } catch (error) {
      setLoading(false);
      setError(error as Error);
      setRecipes(null);
    }

    return controller;
  };

  useEffect(() => {
    const controller = fetchRecipes();
    return () => controller.abort();
  }, []);

  const refreshRecipes = () => {
    fetchRecipes();
  };

  const deleteRecipe = (recipeId: Recipe["id"]) => {
    if (recipeId === undefined)
      return console.log("Cannot delete recipe with undefined id");
    const result = fetch(apiUrl.toString() + `/${recipeId}`, {
      method: "DELETE",
    })
      .then(
        (response) => {
          if (response.status != 201) {
            response
              .json()
              .then((value) => console.log(value, response.status));
            return false;
          }
          console.log("succsessfully deleted");
          return true;
        },
        (error) => console.log("faile to execute delete request ", error)
      )
      .finally(refreshRecipes);
    return result;
  };

  const createRecipe = (recipe: Recipe) => {
    fetch(new URL(import.meta.env.VITE_API_URL + "/recipes"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(recipe),
    }).then(
      (result) =>
        result.json().then((body) => {
          refreshRecipes();
          console.log(body);
        }),
      (err) => console.log(err)
    );
  };

  return {
    recipes,
    loading,
    error,
    refreshRecipes,
    deleteRecipe,
    createRecipe,
  };
}

export function useRecipesContext() {
  const getRecipesContext = useContext(RecipeContext);
  if (!getRecipesContext)
    throw new Error(
      "no parent RecipesProvider is provided for useRecipeContext"
    );
  return getRecipesContext;
}

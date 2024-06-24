import RecipeForm from "../../Components/RecipeForm";
import { useRecipesContext } from "../../lib/recipesHooks";

export default function Home() {
  const { recipes, error, loading, deleteRecipe } = useRecipesContext();

  const handleDeleteRecipe = (event: React.MouseEvent<HTMLButtonElement>) => {
    deleteRecipe(event.currentTarget.value);
  };

  return (
    <>
      <h1>This is Home</h1>
      <RecipeForm />
      {loading && <h1>Loading Recipes</h1>}
      {error && <h1>Error Loading Recipes : {error.message}</h1>}
      {recipes?.map((recipe) => (
        <div key={recipe.id}>
          <p>
            {recipe.name} {recipe.id}
          </p>
          <button onClick={handleDeleteRecipe} value={recipe.id}>
            X
          </button>
        </div>
      ))}
    </>
  );
}

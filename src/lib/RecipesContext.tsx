import { ReactNode, createContext } from "react";
import { useRecipes } from "./recipesHooks";

export const RecipeContext = createContext<ReturnType<
  typeof useRecipes
> | null>(null);

export const RecipesProvider = ({ children }: { children: ReactNode }) => {
  const context = useRecipes();

  return (
    <RecipeContext.Provider value={context}>{children}</RecipeContext.Provider>
  );
};

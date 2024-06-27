import Input from "../Input";
import DropDown from "../DropDown";
import MultipleInput from "../MultipleInput";
import AromaInput from "../AromaInput";
import { getRecipeFromFormEntries } from "../../lib/Models/Recipe";
import { useRecipesContext } from "../../hooks/recipesHooks";

export default function RecipeForm() {
  const { createRecipe } = useRecipesContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries());
    const newRecipe = getRecipeFromFormEntries(formDataObject);
    console.log("sending : ", newRecipe);
    createRecipe(newRecipe);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Input
          id="recipeName"
          name="recipeName"
          placeholder="Recipe name"
          required
        />
        <DropDown
          label="PG/VG Ratio"
          name="pgVgRatio"
          options={[
            { name: "one", value: "one" },
            { name: "Two", value: "Two" },
          ]}
        />
        <Input
          type="number"
          placeholder="Nicotine (mg/ml)"
          name="nicotinRatio"
        />
        <MultipleInput
          minCount={1}
          maxCount={3}
          renderComponent={(key: string) => (
            <AromaInput
              key={key}
              proportion={true}
              quantity={true}
              uniqueKey={key}
              required
            />
          )}
        />
        <button type="submit">submit</button>
      </form>
    </>
  );
}

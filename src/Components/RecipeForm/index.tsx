import Input from "../Input";
import DropDown from "../DropDown";
import MultipleInput from "../MultipleInput";
import AromaInput from "../AromaInput";
import { Recipe } from "../../lib/Recipe";
import { useRecipesContext } from "../../lib/recipesHooks";

export default function RecipeForm() {
  const { createRecipe } = useRecipesContext();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const formDataObject = Object.fromEntries(formData.entries());
    const newRecipe = Recipe.getFromFormEntries(formDataObject);
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

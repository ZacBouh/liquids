import Input from "../Input";
import DropDown from "../DropDown";
import MultipleInput from "../MultipleInput";

export default function RecipeForm() {
  return (
    <>
      <Input id="recipeName" name="recipeName" placeholder="Recipe name" />
      <DropDown
        label="PG/VG Ratio"
        options={[
          { name: "one", value: "one" },
          { name: "Two", value: "Two" },
        ]}
      />
      <Input type="number" placeholder="Nicotine (mg/ml)" />
      <MultipleInput
        renderComponent={(key: string) => (
          <Input name={"aroma_" + key} id={"aroma_" + key} />
        )}
      />
    </>
  );
}

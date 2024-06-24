import AutocompleteInput from "../AutocompleteInput";
import Input from "../Input";

type AromaInputProps = {
  name?: string;
  uniqueKey?: string;
  aromaPlaceholder?: string;
  brandPlaceholder?: string;
  proportionPlaceholder?: string;
  quantityPlaceholder?: string;
  proportion: boolean;
  quantity: boolean;
  required?: boolean;
} & React.ComponentPropsWithRef<"div">;

export default function AromaInput({
  name = "aroma",
  uniqueKey,
  aromaPlaceholder = "Aroma",
  brandPlaceholder = "Brand",
  proportion,
  proportionPlaceholder = "%",
  quantity,
  quantityPlaceholder = "ml",
  required,
  ...props
}: AromaInputProps) {
  const uniqueName = name + "_" + (uniqueKey !== undefined ? uniqueKey : "");
  return (
    <>
      <div {...props}>
        <AutocompleteInput
          placeholder={aromaPlaceholder}
          name={uniqueName}
          required={required}
        />
        <AutocompleteInput
          placeholder={brandPlaceholder}
          name={uniqueName + "_brand"}
        />
        {proportion && (
          <Input
            type="number"
            placeholder={proportionPlaceholder}
            name={uniqueName + "_proportion"}
          />
        )}
        {quantity && (
          <Input
            type="number"
            placeholder={quantityPlaceholder}
            name={uniqueName + "_quantity"}
          />
        )}
      </div>
    </>
  );
}

import { MouseEventHandler, useState } from "react";

type MultipleInputProps = {
  renderComponent: (name: string) => React.ReactElement;
  maxCount: number;
  minCount: number;
};

export default function MultipleInput({
  renderComponent,
  maxCount = 5,
  minCount = 1,
}: MultipleInputProps) {
  const [componentsKeys, setComponentsKeys] = useState(["0"]);
  const [availableKeys, setAvailableKeys] = useState<string[]>([]);

  const handleAdd = (event: React.MouseEvent) => {
    event.preventDefault();
    let newInputKey: string;
    if (componentsKeys.length === maxCount) return;
    if (availableKeys.length > 0) {
      newInputKey = availableKeys[0];
      setAvailableKeys((availableKeys) => availableKeys.slice(1));
    } else {
      newInputKey = componentsKeys.length.toString();
    }
    setComponentsKeys((componentsKeys) => [...componentsKeys, newInputKey]);
  };

  const handleDelete: MouseEventHandler = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (componentsKeys.length === minCount) return;
    const button = event.currentTarget;
    const key = button.value;
    const keyIndex = componentsKeys.indexOf(key);
    setAvailableKeys((availableKeys) => [...availableKeys, key]);
    setComponentsKeys((componentsKeys) => [
      ...componentsKeys.slice(0, keyIndex),
      ...componentsKeys.slice(keyIndex + 1),
    ]);
  };

  return (
    <>
      <button onClick={handleAdd}>Add</button>
      {componentsKeys.map((key) => (
        <div key={key}>
          {renderComponent(key)}
          {componentsKeys.length > minCount && (
            <button value={key} onClick={handleDelete} className={"font-bold"}>
              X
            </button>
          )}
        </div>
      ))}
    </>
  );
}

import { ComponentType, MouseEventHandler, useState } from "react";

export default function MultipleInput({
  renderComponent,
}: {
  renderComponent: (
    name: string
  ) => React.ReactElement<React.ComponentPropsWithRef<"input">>;
}) {
  const [componentsKeys, setComponentsKeys] = useState(["0"]);
  const [availableKeys, setAvailableKeys] = useState<string[]>([]);
  const handleAdd = () => {
    let newInputKey: string;
    if (componentsKeys.length > 4) return;
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
          <button value={key} onClick={handleDelete}>
            Del
          </button>
        </div>
      ))}
    </>
  );
}

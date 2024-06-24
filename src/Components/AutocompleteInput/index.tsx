import { useRef, useState } from "react";
import Input, { InputProps } from "../Input";

type AutocompleteInputProps = InputProps & {
  suggestions?: string[];
  customValue?: boolean;
};

const suggestionHoverStyles = "bg-red-400";

export default function AutocompleteInput({
  customValue,
  suggestions = ["Option 1", "Option 2", "Option 3"],
  ...inpuProps
}: AutocompleteInputProps) {
  const [suggestedValues, setSuggestedValues] = useState<string[]>(suggestions);
  const [inputValue, setInputValue] = useState<string>("");
  const [focused, setFocused] = useState<boolean>(false);
  const suggestedValuesRef = useRef<HTMLElement[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState<number>();

  const handleArrowSelection = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && selectedSuggestion !== undefined) {
      event.preventDefault();
      setInputValue(
        suggestedValuesRef.current[selectedSuggestion].textContent ?? ""
      );
      setSuggestedValues([]);
    }
    if (event.key !== "ArrowDown" && event.key != "ArrowUp") return;
    event.preventDefault();
    const increment = event.key === "ArrowDown" ? 1 : -1;
    const startingIndex =
      event.key === "ArrowDown" ? 0 : suggestedValues.length - 1;

    suggestedValues.length > 0 &&
      setSelectedSuggestion((selectedSuggestion) =>
        selectedSuggestion === undefined ||
        selectedSuggestion === suggestedValuesRef.current.length - increment ||
        selectedSuggestion + increment === -1
          ? startingIndex
          : selectedSuggestion + increment
      );
  };

  const handleUnfocus = () => {
    setTimeout(() => setFocused(false), 150);
    setSelectedSuggestion(undefined);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
    setSelectedSuggestion(undefined);
    setSuggestedValues(() =>
      suggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  };

  const handleSuggestionClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setFocused(true);
    setInputValue(event.currentTarget.textContent ?? "");
  };

  return (
    <>
      <Input
        placeholder="autocomplete"
        {...inpuProps}
        onFocus={() => setFocused(true)}
        onBlur={handleUnfocus}
        onKeyDown={handleArrowSelection}
        value={inputValue}
        onChange={handleChange}
        autoComplete="off"
      />
      {suggestedValues.length > 0 && focused && (
        <div>
          {suggestedValues.map((suggestion, index) => (
            <div
              ref={(element) =>
                element && (suggestedValuesRef.current[index] = element)
              }
              key={suggestion + index}
              className={
                index === selectedSuggestion ? suggestionHoverStyles : ""
              }
              onClick={handleSuggestionClick}
            >
              {suggestion}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

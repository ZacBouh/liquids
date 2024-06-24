type DropDownProps = React.ComponentPropsWithRef<"select"> & {
  options: { name: string; value: string }[];
  label?: string;
};

export default function DropDown({
  id,
  options,
  label,
  ...props
}: DropDownProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <select defaultValue={"not chosen"} id={id} {...props}>
        <option value={"not chosen"} disabled>
          choose
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.name}>
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
}

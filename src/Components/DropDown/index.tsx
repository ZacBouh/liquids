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
      <select id={id} {...props}>
        <option selected disabled>
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

type InputProps = React.ComponentPropsWithRef<"input"> & {
  label?: string;
};

export default function Input({ id, label, ...props }: InputProps) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input id={id} {...props} className="border-2 border-black" />
    </>
  );
}

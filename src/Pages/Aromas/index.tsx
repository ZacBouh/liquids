import { useAromas } from "../../hooks/aromasHooks";

export default function Aromas() {
  const { data, error, loading, refreshAromas } = useAromas();
  const aromas = data;
  console.log("Aromas value is ", aromas);
  return (
    <>
      <h1>ROUTING WORKS</h1>
      {aromas &&
        aromas.map((aroma) => {
          return (
            <div>
              {aroma.name} {aroma.brand} {aroma.id}{" "}
            </div>
          );
        })}
    </>
  );
}

import { ReactNode, createContext } from "react";
import { useBrands } from "../hooks/brandsHooks";

export const BrandsContext = createContext<ReturnType<typeof useBrands> | null>(
  null
);

export function BrandsProvider({ children }: { children: ReactNode }) {
  const context = useBrands();

  return (
    <BrandsContext.Provider value={context}>{children}</BrandsContext.Provider>
  );
}

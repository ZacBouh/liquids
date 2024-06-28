import { ReactNode, createContext } from "react";
import { useAromas } from "../hooks/aromasHooks";

export const AromasContext = createContext<ReturnType<typeof useAromas> | null>(
  null
);

export const AromasProvider = ({ children }: { children: ReactNode }) => {
  const context = useAromas();

  return (
    <AromasContext.Provider value={context}>{children}</AromasContext.Provider>
  );
};

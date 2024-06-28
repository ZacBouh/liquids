import { useEffect, useState, useContext } from "react";
import { Aroma } from "../lib/Models/Aroma";
import customFetch from "../lib/customFetch";
import { AromasContext } from "../context/AromasContext";
import { HookReturnType } from "./hooksTypes";

type UseAromasState = HookReturnType<Aroma[]>;
export function useAromas() {
  const [state, setState] = useState<UseAromasState>({
    data: [],
    loading: false,
    error: null,
  });

  const apiUrl = new URL(import.meta.env.VITE_API_URL + "/aromas");

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchAromas(signal);
    return () => controller.abort();
  }, []);

  const fetchAromas = (signal?: AbortSignal) => {
    setState((state) => ({ ...state, loading: true }));
    return customFetch<Aroma[]>({
      url: apiUrl,
      options: { method: "GET", signal },
    }).then((result) => {
      setState({ ...result, loading: false });
      return result.abortController;
    });
  };

  const refreshAromas = () => {
    fetchAromas();
  };

  return { ...state, refreshAromas };
}

export function useAromasContext() {
  const aromasContext = useContext(AromasContext);
  if (!aromasContext)
    throw new Error("[useAromasContext ERROR] No AromasContext Provider found");

  return AromasContext;
}

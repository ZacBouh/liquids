import { useContext, useEffect, useState } from "react";
import customFetch from "../lib/customFetch";
import Brand from "../lib/Models/Brand";
import { HookReturnType } from "./hooksTypes";
import { BrandsContext } from "../context/BrandsContext";

const apiUrl = new URL(import.meta.env.VITE_API_URL + "/brands");

export function useBrands() {
  const [state, setState] = useState<HookReturnType<Brand[]>>({
    data: undefined,
    error: null,
    loading: false,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    fetchBrands(signal);
    return () => controller.abort();
  }, []);

  const fetchBrands = (signal?: AbortSignal) => {
    setState((state) => ({ ...state, loading: true }));
    customFetch<Brand[]>({
      url: apiUrl,
      options: { method: "GET", signal },
    }).then((result) => setState({ ...result, loading: false }));
  };

  const refreshBrands = () => {
    fetchBrands();
  };

  return { ...state, refreshBrands };
}

export function useBrandsContext() {
  const brandsContext = useContext(BrandsContext);
  if (!brandsContext)
    throw new Error("[useBrandsContext Error] No BrandsProvider found");
  return brandsContext;
}

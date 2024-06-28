export type HookReturnType<T> = {
  data: T | undefined;
  loading: boolean;
  error: Error | null;
};

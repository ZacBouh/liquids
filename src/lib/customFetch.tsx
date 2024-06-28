type CustomFetchArgs = {
  url: URL;
  options?: RequestInit;
};

type CustomFetchReturnValue<T> = {
  error: Error | null;
  data: T | undefined;
  abortController: AbortController;
};

export default async function customFetch<T>({
  url,
  options,
}: CustomFetchArgs): Promise<CustomFetchReturnValue<T>> {
  const abortController = new AbortController();

  return fetch(url, { ...options })
    .then(
      (response) => {
        return response.json();
      },
      (error) => {
        throw new Error(`[customFetch ERROR] ${error}`);
      }
    )
    .then((data) => {
      return { data: data.body as T, error: null, abortController };
    })
    .catch((error) => ({ data: undefined, error, abortController }));
}

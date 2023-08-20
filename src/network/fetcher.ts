export namespace Network {
  export const fetcher = async <T>(
    ...args: Parameters<typeof fetch>
  ): Promise<T> => {
    const response = await fetch(...args);
    if (!response.ok) {
      throw new Error(response.status + ", " + response.statusText);
    }

    const parsed = await response.json();
    return parsed as T;
  };
}

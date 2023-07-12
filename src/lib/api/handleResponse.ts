export async function handleResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("Content-Type") || "";
  const isJson = contentType.includes("application/json");
  const data = isJson ? await response.json() : await response.text();

  if (!response.ok) {
    if (isJson && data.message !== null) {
      throw new Error(data.message);
    }

    throw new Error(data.message || response.statusText);
  }

  return data as T;
}

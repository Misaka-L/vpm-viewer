export async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  return await response.json();
}

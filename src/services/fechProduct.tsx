export async function fetchCharacters(
  dui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    https://server-douvery.vercel.app/api/products/${dui}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch characters');
  }
  const results = await response.json();

  return results;
}

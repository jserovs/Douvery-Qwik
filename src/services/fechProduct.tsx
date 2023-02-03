export async function fetchProduct(
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
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}
export async function fetchSuggestions(
  searchInput: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    https://server-douvery.vercel.app/suggestions?q=${searchInput}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function fetchCodePostal(
  codepostal: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    http://localhost:7699/geocode?code=${codepostal}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch code');
  }
  const results = await response.json();
  console.log(results);
  return results;
}

import { urlServerNode } from '../fechProduct';

export async function fetchProductsOutstanding(
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/products-outstanding`,
    {
      method: 'GET',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}

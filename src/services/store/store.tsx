import { urlServerNode } from '../fechProduct';

export async function fetchStore(
  ospayne: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/${ospayne}`,
    {
      signal: controller?.signal,
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}

export async function fetchStoreProductBySubCategorie(
  ospayne: string,
  category: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/products/by-categories`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ospayne: ospayne,
        category: category,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}

export async function fetchStoreFollowers(
  ospayne: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/followers`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ospayne: ospayne,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}

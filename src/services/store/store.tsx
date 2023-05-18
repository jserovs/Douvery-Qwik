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
export async function fetchStoreProductsAll(
  ospayne: string,
  page: number,
  sortOrder: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/all-products`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ospayne: ospayne,
        page: page,
        sortOrder: sortOrder,
      }),
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
  page: number,
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
        page: page,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}
export async function fetchStoreCategoriesAndImg(
  ospayne: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/categories-img`,
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
export async function fetchStoreCategoriesDiscounts(
  ospayne: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/categories-discounts`,
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

export async function fetchStoreProductsDiscounts(
  ospayne: string,
  page: number,
  sortOrder: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/store/discount-products`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ospayne: ospayne,
        page: page,
        sortOrder: sortOrder,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}

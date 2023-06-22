import { urlServerNode } from '../fechProduct';

// Fetch search product
export async function fetchSearchProduct(
  category: string,
  subcategory: string,
  query: string,
  orderPrice: string,
  rating: string,
  order: string,
  page: number,
  brand: string,
  user: string | null,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
  ${urlServerNode}/apisearch/products/search?page=${page}&query=${query}&category=${category}&subcategory=${subcategory}&price=${orderPrice}&rating=${rating}&order=${order}&brand=${brand}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: user ? `x-auth-token ${user}` : '',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products search');
  }
  const results = await response.json();

  return results;
}

// Fetch search history user
export async function fetchSearchHistoryUser(
  user: string | null,
  itemsReturned: Array<string>,
  searchTerm: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
  ${urlServerNode}/apisearch/users-history`,
    {
      method: 'POST',
      signal: controller?.signal,

      body: JSON.stringify({ itemsReturned, searchTerm }),
      headers: {
        'Content-Type': 'application/json',

        Authorization: `x-auth-token ${user}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to SEARCH HISTORY USER');
  }
  const results = await response.json();

  return results;
}

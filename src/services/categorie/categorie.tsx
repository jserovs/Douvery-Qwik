import { urlServerNode } from '../fechProduct';

export async function fetchCategoryAllProducts(
  categorie: string,
  subCategory: string,
  page: number,
  sortOrder: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/categorie/all-product`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categorie: categorie,
        subCategory: subCategory,
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

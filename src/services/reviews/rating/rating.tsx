import { urlServerLocal } from '~/services/fechProduct';

export async function fetchProductRatings(
  productDui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerLocal}/api/product/rating`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productDui: productDui,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function fetchProductRatingsCounts(
  productDui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerLocal}/api/product/rating-counts`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productDui: productDui,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

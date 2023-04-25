import { urlServerLocal } from '~/services/fechProduct';

export async function fetchReviewsProduct(
  productDui: string,

  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
 ${urlServerLocal}/api/product/${productDui}/reviews`,
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

export async function fetchCanUserComments(
  productDui: string,
  userId: string
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerLocal}/api/can-user-comment`,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productDui: productDui,
        userId: userId,
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
  console.log(results);
  return results;
}

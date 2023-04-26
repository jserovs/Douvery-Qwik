import { urlServerNode } from '~/services/fechProduct';

export async function fetchReviewsProduct(
  productDui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
 ${urlServerNode}/api/product/${productDui}/reviews`,
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
  userId: string,
  controller?: AbortController
): Promise<any> {
  if (!userId) {
    return { canComment: false, lastPurchaseDate: null };
  }
  const response = await fetch(
    `
    ${urlServerNode}/api/can-user-comment`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        productDui: productDui,
        userId: userId ? userId : '',
      }),
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

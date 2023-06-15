import { urlServerNode } from '../fechProduct';

export async function productUserLikeDislike(
  userId: string,
  productDui: string,
  like: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/user/likeDislikeProduct`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productDui,
        like,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function getProductLikeStatus(
  userId: string,
  productDui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/user/getLikeStatus?userId=${userId}&productDui=${productDui}`,
    {
      method: 'GET',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
 
  return results;
}

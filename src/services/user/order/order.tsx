import { urlServerLocal } from '~/services/fechProduct';

export async function fetchUniqueOrderUser(
  userToken: string,
  orderId: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerLocal}/api/orders/`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'x-auth-token': userToken,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        orderId: orderId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const results = await response.json();
  return results;
}

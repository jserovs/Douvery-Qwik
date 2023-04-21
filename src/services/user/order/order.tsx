import { urlServerLocal, urlServerNode } from '~/services/fechProduct';

export async function fetchUniqueOrderUser(
  userToken: string,
  orderId: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/orders/`,
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

export async function fetchOrdesUser(
  userToken: string,
  userId: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerLocal}/api/user/orders`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'x-auth-token': userToken,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: userId,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const results = await response.json();

  return results;
}

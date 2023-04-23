import { urlServerNode } from '~/services/fechProduct';

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
  console.log(results);
  return results;
}

export async function fetchOrdesUser(
  userToken: string,
  userId: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/user/orders`,
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
  console.log(results);
  return results;
}

export async function fetchSearchOrder(
  userToken: string,
  searchInput: string,
  userId: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
 ${urlServerNode}/api/orders/search?q=${searchInput}&userId=${userId}`,
    {
      signal: controller?.signal,
      headers: {
        'x-auth-token': userToken,
        'Content-Type': 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
  console.log(results);
  return results;
}

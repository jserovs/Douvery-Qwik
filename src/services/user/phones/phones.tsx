import { urlServerNode } from '~/services/fechProduct';

export async function fetchPhonesUser(
  userID: string,
  userToken: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/user-phones`,
    {
      method: 'post',
      signal: controller?.signal,
      headers: {
        'x-auth-token': userToken,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: userID,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();

  return results;
}

export async function fetchIndexPhonesUser(
  userToken: string,
  userID: string,
  index: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/get-index-user-phones`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'x-auth-token': userToken,
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        userId: userID,
        index: index,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }

  const results = await response.json();

  return results;
}

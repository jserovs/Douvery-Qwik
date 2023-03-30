import { urlServerNode } from '~/services/fechProduct';

export async function fetchAddressUser(
  userID: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/user-address/${userID}`,
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

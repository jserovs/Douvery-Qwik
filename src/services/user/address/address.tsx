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
export async function fetchIndexAddressUser(
  userToken: string,
  userID: string,
  index: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/get-index-user-address`,
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

export async function fetchAddressUserIP(
  latitude: number,
  longitude: number,
  controller?: AbortController
): Promise<any> {
  const apiKey = '2ebef1a3ac4c44c3b629a19330701d14';
  const response = await fetch(
    `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${apiKey}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch address');
  }
  const results = await response.json();

  return results;
}

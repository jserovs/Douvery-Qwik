import { getCurrentTimestamp } from '~/fuctions/fuctionGetCurrentTimestampUser';

import { urlServerNode } from '../fechProduct';

export async function sendUserTimestamp({
  productDui,
  userId,
}: {
  productDui: string;
  userId: string;
}) {
  const timestamp = getCurrentTimestamp();

  try {
    const response = await fetch(`${urlServerNode}/api/product/userTimestamp`, {
      method: 'POST',
      body: JSON.stringify({
        userId,
        productDui,
        timestamp,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error();
    }

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

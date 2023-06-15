import { getCurrentTimestamp } from '~/fuctions/fuctionGetCurrentTimestampUser';
import { getCookieData } from '../auth/login/login';
import { urlServerNode } from '../fechProduct';

export async function sendUserTimestamp({
  productDui,
  userId,
}: {
  productDui: string;
  userId: string;
}) {
  const sessionDExists = getCookieData('SESSION_D');

  const timestamp = getCurrentTimestamp();

  if (!sessionDExists) {
    try {
      const response = await fetch(
        `${urlServerNode}/api/product/userTimestamp`,
        {
          method: 'POST',
          body: JSON.stringify({
            userId,
            productDui,
            timestamp,
          }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  }
}

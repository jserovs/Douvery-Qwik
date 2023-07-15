import { urlServerLocal } from '../fechProduct';

export async function fetchProductPriceHistory(
  dui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerLocal}/api/product/${dui}/price-history`,
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

import { urlServerLocal } from '../fechProduct';

export async function fetchStore(
  ospayne: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerLocal}/api/store/${ospayne}`,
    {
      signal: controller?.signal,
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch store');
  }
  const results = await response.json();

  return results;
}

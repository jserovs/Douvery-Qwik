import { getCookieData } from '../auth/login/login';
import { urlServerLocal, urlServerNode } from '../fechProduct';

export const OPTIONS_KEY_VIEWED_PRODUCTS = 'V_P';

export function getDataViewedProducts() {
  const viewed = localStorage.getItem(OPTIONS_KEY_VIEWED_PRODUCTS);
  if (viewed != null) {
    try {
      return JSON.parse(viewed);
    } catch (error) {
      console.error(error);
    }
  }
}
export function getLastItemViewedDui() {
  const stored = localStorage.getItem(OPTIONS_KEY_VIEWED_PRODUCTS);

  if (stored) {
    const viewedItems = JSON.parse(stored);

    // Si es un array y tiene elementos, devuelve el "dui" del último elemento
    if (Array.isArray(viewedItems) && viewedItems.length > 0) {
      return viewedItems[viewedItems.length - 1].dui;
    }
  }

  // En caso de que no haya elementos, devuelve null
  return null;
}

export async function addToViewedProducts({ dui }: { dui: string }) {
  const sessionDExists = getCookieData('SESSION_D');
  if (sessionDExists) {
    try {
      const response = await fetch(
        `${urlServerNode}/api/viewed/productsDui/json`,
        {
          method: 'POST',
          body: JSON.stringify({ dui }),
          headers: { 'Content-Type': 'application/json' },
        }
      );

      if (!response.ok) {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
    }
  } else {
    const viewed = getDataViewedProducts() || [];
    const productIndex = viewed.findIndex(
      (product: { dui: string }) => product.dui === dui
    );

    if (productIndex > -1) {
      viewed.splice(productIndex, 1);
    }

    viewed.push({ dui });
    localStorage.setItem(OPTIONS_KEY_VIEWED_PRODUCTS, JSON.stringify(viewed));
  }
}

export async function transferViewedProductsToAPI() {
  const sessionDExists = document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('SESSION_D='));

  if (sessionDExists) {
    const viewed = getDataViewedProducts() || [];
    for (const product of viewed) {
      try {
        const response = await fetch(
          `${urlServerNode}/api/viewed/productsDui/json`,
          {
            method: 'POST',
            body: JSON.stringify(product),
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

    removeAllViewedProducts();
  }
}

export async function getDataViewedProduct() {
  const stored = localStorage.getItem(OPTIONS_KEY_VIEWED_PRODUCTS);
  try {
    const settings = JSON.parse(stored as string);
    const response = await fetch(
      `${urlServerNode}/api/viewed/productsDui/json/`,
      {
        method: 'POST',
        body: JSON.stringify({ limit: 8, viewedData: settings }),
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    return await response.json();
  } catch (e) {
    console.error(e);
    return (
      'No se encontraron datos en localStorage para la clave: ' +
      OPTIONS_KEY_VIEWED_PRODUCTS
    );
  }
}

export function removeAllViewedProducts() {
  localStorage.removeItem(OPTIONS_KEY_VIEWED_PRODUCTS);
}

export async function productUserLikeDislike(
  userId: string,
  productDui: string,
  like: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerLocal}/api/user/likeDislikeProduct`,
    {
      method: 'POST',
      signal: controller?.signal,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId,
        productDui,
        like,
      }),
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch product');
  }
  const results = await response.json();
  console.log(results);
  return results;
}

export async function getProductLikeStatus(
  userId: string,
  productDui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerLocal}/api/user/getLikeStatus?userId=${userId}&productDui=${productDui}`,
    {
      method: 'GET',
      signal: controller?.signal,
      headers: {
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

export const urlServerLocal = 'http://localhost:9039';
export const urlServerNode = 'https://server-douvery.vercel.app';
// export const urlServerNode = 'https://server-douvery.onrender.com';
const urlServerPython = 'https://htyr.onrender.com';

export async function fetchProduct(
  dui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
    ${urlServerNode}/api/products/${dui}`,
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

export async function fetchProductU(
  limit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `${urlServerNode}/productsByRandom/?limit=${limit}`,
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

export async function fetchAllPopularProducts(
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `${urlServerNode}/api/products/all-popular-products`,
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
  return results;
}

export async function fetchProductCategory(
  category: string,
  dui: string,
  numlimit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/productsByCategory/?category=${category}&limit=${numlimit}&excludeDui=${dui}`,
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

export async function fetchProductSubCategory(
  subCategory: string,
  dui: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/api/productsBySubCategory/?subCategory=${subCategory}&limit=2&excludeDui=${dui}`,
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

export async function fetchSuggestions(
  searchInput: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/suggestions?q=${searchInput}`,
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
export async function fetchCode(
  searchInput: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
 ${urlServerNode}/geocode?q=${searchInput}`,
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

export async function fetchCodePostal(
  codepostal: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerNode}/q?code=${codepostal}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch code');
  }
  const results = await response.json();

  return results;
}

export async function fetchSystemRecomendationProductU(
  dui: string,
  numlimit: number,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
   ${urlServerPython}/recommend_products/${dui}?limit=${numlimit}`,
    {
      signal: controller?.signal,
    }
  );

  if (!response.ok) {
    throw new Error('Error al obtener recomendaciones');
  }
  const results = await response.json();

  return results;
}

export async function fetchIpInfo(): Promise<any> {
  const response = await fetch(
    `
  https://ipinfo.io/country?token=0d62ca75f9e230`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch code');
  }
  const results = await response.text();

  return results;
}

export async function fetchSearchProduct(
  category: string,
  subcategory: string,
  query: string,
  orderPrice: string,
  rating: string,
  order: string,
  page: number,
  brand: string,
  user: string | null,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
  ${urlServerNode}/apisearch/products/search?page=${page}&query=${query}&category=${category}&subcategory=${subcategory}&price=${orderPrice}&rating=${rating}&order=${order}&brand=${brand}`,
    {
      signal: controller?.signal,
      headers: {
        Authorization: user ? `x-auth-token ${user}` : '',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch products search');
  }
  const results = await response.json();

  return results;
}

export async function fetchSearchHistoryUser(
  user: string | null,
  itemsReturned: Array<string>,
  searchTerm: string,
  controller?: AbortController
): Promise<any> {
  const response = await fetch(
    `
  ${urlServerNode}/apisearch/users-history`,
    {
      method: 'POST',
      signal: controller?.signal,

      body: JSON.stringify({ itemsReturned, searchTerm }),
      headers: {
        'Content-Type': 'application/json',

        Authorization: `x-auth-token ${user}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to SEARCH HISTORY USER');
  }
  const results = await response.json();

  return results;
}

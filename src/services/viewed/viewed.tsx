import { getCookieData } from '../auth/login/login';
import { urlServerLocal, urlServerNode } from '../fechProduct';

const OPTIONS_KEY_VIEWED_PRODUCTS = 'V_P';

export function getDataViewedProducts() {
  const viewed = localStorage.getItem(OPTIONS_KEY_VIEWED_PRODUCTS);
  if (viewed != null) {
    try {
      const data = JSON.parse(viewed);
      return data;
    } catch (error) {
      console.error('Error al decodificar los datos:', error);
    }
  } else {
    console.warn(
      'No se encontraron datos en localStorage para la clave:',
      OPTIONS_KEY_VIEWED_PRODUCTS
    );
  }
}
export async function addToViewedProducts({ dui }: { dui: string }) {
  console.log('Intentando agregar a la lista de productos vistos:', { dui });

  // Verifica si la cookie SESSION_D existe
  const sessionDExists = getCookieData('SESSION_D');
  if (sessionDExists) {
    // Si la cookie SESSION_D existe, envía el producto a la API
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
        throw new Error('Error al enviar el producto a la API');
      }

      console.log('Producto enviado a la API:', { dui });
    } catch (error) {
      console.error('Error al enviar el producto a la API:', error);
    }
  } else {
    // Si la cookie SESSION_D no existe, guarda el producto en el almacenamiento local
    const viewed = getDataViewedProducts() || [];
    const productExists = viewed.some(
      (product: { dui: string }) => product.dui === dui
    );

    if (!productExists) {
      viewed.push({ dui });
      localStorage.setItem(OPTIONS_KEY_VIEWED_PRODUCTS, JSON.stringify(viewed));
      console.log('Producto añadido a la lista de productos vistos:', { dui });
    } else {
      console.log('El producto ya existe en la lista de productos vistos:', {
        dui,
      });
    }
  }
}

export async function transferViewedProductsToAPI() {
  // Verifica si la cookie SESSION_D existe
  const sessionDExists = document.cookie
    .split(';')
    .some((item) => item.trim().startsWith('SESSION_D='));

  if (sessionDExists) {
    // Si la cookie SESSION_D existe, obtén los productos del almacenamiento local
    const viewed = getDataViewedProducts() || [];

    // Envía cada producto a la API
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
          throw new Error('Error al enviar el producto a la API');
        }

        console.log('Producto enviado a la API:', product);
      } catch (error) {
        console.error('Error al enviar el producto a la API:', error);
      }
    }

    // Borra todos los productos del almacenamiento local
    removeAllViewedProducts();
  }
}

export async function getDataViewedProduct() {
  const stored = localStorage.getItem(OPTIONS_KEY_VIEWED_PRODUCTS);
  try {
    const settings = JSON.parse(stored as string);
    const response = await fetch(
      `${urlServerLocal}/api/viewed/productsDui/json/`,
      {
        method: 'POST',
        body: JSON.stringify({
          limit: 4,
          viewedData: settings,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.status === 400) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.msg);
    }
    const data = await response.json();
    console.log(data);
    return data;
  } catch (e) {
    return (
      'No se encontraron datos en localStorage para la clave: ' +
      OPTIONS_KEY_VIEWED_PRODUCTS
    );
  }
}

export function removeAllViewedProducts() {
  localStorage.removeItem(OPTIONS_KEY_VIEWED_PRODUCTS);
  console.log(
    'Todos los elementos han sido eliminados de la lista de productos vistos.'
  );
}

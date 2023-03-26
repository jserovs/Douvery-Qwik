
import Cookies from 'js-cookie';
import { urlServerNode } from "../fechProduct";

export const COOKIE_EXPIRATION_MS = 30 * 24 * 60 * 60 * 1000; 
export const CART_QUANTITY_ACCESS_COOKIE_NAME = 'cvt';
const OPTIONS_KEY_CART = 'cart';

export interface CartItem {
  dui: string;
  quantity: number;
}

export const setCookiesDataCart = (dataAccess :any) => {
  Cookies.set(CART_QUANTITY_ACCESS_COOKIE_NAME, dataAccess, {
    path: '/',
    sameSite: 'strict',
    expires: new Date(Date.now() + COOKIE_EXPIRATION_MS),
  });
};

export const getCookieData = () => {
  const cookieData = Cookies.get(CART_QUANTITY_ACCESS_COOKIE_NAME);

  if (cookieData) {
    console.log(`El contenido de la cookie '${CART_QUANTITY_ACCESS_COOKIE_NAME}' es:`, cookieData);
  } else {
    console.log(`La cookie '${CART_QUANTITY_ACCESS_COOKIE_NAME}' no está establecida.`);
  }
};

export function getDataCart() {
  const cart = localStorage.getItem(OPTIONS_KEY_CART);
  if (cart != null) {
    try {
      const data = JSON.parse(cart);
      return data;
    } catch (error) {
      console.error('Error al decodificar los datos:', error);
    }
  } else {
    console.warn('No se encontraron datos en localStorage para la clave:', OPTIONS_KEY_CART);
  }
}
export function getTotalQuantity() {
 
  const cart = getDataCart() || [];
  let totalQuantity = 0;

  cart.forEach((item: CartItem) => {
    totalQuantity += item.quantity;
  });
 setCookiesDataCart(totalQuantity);

  return totalQuantity;
}

export function addToCart({dui, quantity}: {dui: string,quantity: number}) {
  console.log('Agregando al carrito:', {dui, quantity});

  const cart = getDataCart() || [];
  quantity = Number(quantity);
  const existingItem = cart.find((item: CartItem) => item.dui === dui);

  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({dui,quantity});
  }
  localStorage.setItem(OPTIONS_KEY_CART, JSON.stringify(cart));
  console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_CART);
  getTotalQuantity(); // Actualiza la cookie después de agregar un artículo al carrito
}

export function decreaseCartItemQuantity({dui, decreaseAmount}: {dui: string,decreaseAmount:number}) {
  const cart = getDataCart() || [];
  const existingItem = cart.find((item: { dui: string; }) => item.dui === dui);

  if (existingItem) {
    existingItem.quantity -= decreaseAmount;
    if (existingItem.quantity <= 0) {
      const itemIndex = cart.indexOf(existingItem);
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem(OPTIONS_KEY_CART, JSON.stringify(cart));
    console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_CART);
    getTotalQuantity(); // Actualiza la cookie después de disminuir la cantidad de un artículo
  } else {
    console.warn('El artículo con DUI', dui, 'no está en el carrito.');
  }
}

export function removeCartItem({dui}: {dui: string}) {
  const cart = getDataCart() || [];

  const existingItem = cart.find((item: { dui: string; }) => item.dui === dui);

  if (existingItem) {
    const itemIndex = cart.indexOf(existingItem);
    cart.splice(itemIndex, 1);
    localStorage.setItem(OPTIONS_KEY_CART, JSON.stringify(cart));
    console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_CART);
    getTotalQuantity(); // Actualiza la cookie después de eliminar un artículo del carrito
  } else {
    console.warn('El artículo con DUI', dui, 'no está en el carrito.');
  }
}


export function removeAllCartItems() {
  localStorage.removeItem(OPTIONS_KEY_CART);
  console.log('Todos los elementos han sido eliminados del carrito.');
  getTotalQuantity(); // Actualiza la cookie después de eliminar todos los elementos del carrito
}



export async function  getDataProductCart  () {
  const stored = localStorage.getItem(OPTIONS_KEY_CART);
  try {
    const settings = JSON.parse(stored as string);
    const response = await fetch(
  ` ${urlServerNode}/api/productsDui/json`,
  {
    method: 'POST',
    body: JSON.stringify({
      cartData: settings
    }),
    headers: {
       'Content-Type': 'application/json',
    },
  });

  if (response.status === 400) {
  const errorResponse = await response.json();
  throw new Error(errorResponse.msg);
  }
    const data = await response.json();
     return data;
   

  } catch (e) {
    return 'No se encontraron datos en localStorage para la clave: ' + OPTIONS_KEY_CART;
  }
}



// export async function  getDataProductCart  () {
//   const stored = localStorage.getItem(OPTIONS_KEY_CART);
//   try {
//     const settings = JSON.parse(stored as string);

//   const response = await fetch(
//   `http://localhost:8339/api/productsDui/json`,
//   {
//     method: 'POST',
//     body: JSON.stringify({
//       cartData: settings
//     }),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   }
// );

// if (response.status === 400) {
//   const errorResponse = await response.json();
//   throw new Error(errorResponse.msg);
// }
//     const data = await response.json();
//     return data;

//   } catch (e) {
//     return 'No se encontraron datos en localStorage para la clave: ' + OPTIONS_KEY_CART;
//   }
// }


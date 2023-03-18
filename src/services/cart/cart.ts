

const OPTIONS_KEY_CART = 'cart';

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

export function addToCart({dui, quantity,}: {dui: string,images:string,name:string, quantity: number,price:number, stock:boolean}) {
  console.log('Agregando al carrito:', {dui, quantity});

  const cart = getDataCart() || [];

  // Convertir quantity a Number
  quantity = Number(quantity);

  // Buscar si el artículo ya está en el carrito
  const existingItem = cart.find((item: { dui: string; }) => item.dui === dui);


  if (existingItem) {
    // Si el artículo ya está en el carrito, sumar la cantidad
    existingItem.quantity += quantity;
    

  } else {
  
    cart.push({dui,quantity});
  }
  localStorage.setItem(OPTIONS_KEY_CART, JSON.stringify(cart));
  console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_CART);
}

export function decreaseCartItemQuantity({dui, decreaseAmount,}: {dui: string,decreaseAmount:number}) {
  const cart = getDataCart() || [];

  // Buscar el artículo en el carrito
  const existingItem = cart.find((item: { dui: string; }) => item.dui === dui);

  if (existingItem) {
    // Si el artículo ya está en el carrito, disminuir la cantidad
    existingItem.quantity -= decreaseAmount;
    // Si la cantidad es menor o igual a cero, eliminar el artículo del carrito
    if (existingItem.quantity <= 0) {
      const itemIndex = cart.indexOf(existingItem);
      cart.splice(itemIndex, 1);
    }
    localStorage.setItem(OPTIONS_KEY_CART, JSON.stringify(cart));
    console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_CART);
  } else {
    console.warn('El artículo con DUI', dui, 'no está en el carrito.');
  }
}

export function removeCartItem({dui}: {dui: string}) {
  const cart = getDataCart() || [];

  // Buscar el artículo en el carrito
  const existingItem = cart.find((item: { dui: string; }) => item.dui === dui);

  if (existingItem) {
    const itemIndex = cart.indexOf(existingItem);
    cart.splice(itemIndex, 1);
    localStorage.setItem(OPTIONS_KEY_CART, JSON.stringify(cart));
    console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_CART);
  } else {
    console.warn('El artículo con DUI', dui, 'no está en el carrito.');
  }
}

export async function  getDataProductCart  () {
  const stored = localStorage.getItem(OPTIONS_KEY_CART);
  try {
    const settings = JSON.parse(stored as string);
    const response = await fetch(
  ` http://localhost:8339/api/productsDui/json`,
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


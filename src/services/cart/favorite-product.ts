import {urlServerNode,  } from "../fechProduct";

const OPTIONS_KEY_FAVORITE_PRODUCTS = 'F_P';

export function getDataFavoriteProducts() {
  const favorite = localStorage.getItem(OPTIONS_KEY_FAVORITE_PRODUCTS);
  if (favorite != null) {
    try {
      const data = JSON.parse(favorite);
      return data;
    } catch (error) {
      console.error('Error al decodificar los datos:', error);
    }
  } else {
    console.warn('No se encontraron datos en localStorage para la clave:', OPTIONS_KEY_FAVORITE_PRODUCTS);
  }
}
export function isFavorite({dui}: {dui: string}) {
  const favorites = getDataFavoriteProducts();
  return favorites?.some((favorite: {dui: string}) => favorite.dui === dui) || false;
}

export function addToFavoriteProducts({dui}: {dui: string}) {
  console.log('Agregando a la lista de Favorito:', {dui});
  const cart = getDataFavoriteProducts() || [];
  cart.push({dui}); // Agregar el objeto que se quiere guardar a la variable cart
  localStorage.setItem(OPTIONS_KEY_FAVORITE_PRODUCTS, JSON.stringify(cart));
  
}
export function removeFromFavoriteProducts({dui}: {dui: string}) {
  console.log('Removiendo de la lista de Favorito:', {dui});
  let favorites = getDataFavoriteProducts() || [];
  favorites = favorites.filter((favorite: {dui: string}) => favorite.dui !== dui);
  localStorage.setItem(OPTIONS_KEY_FAVORITE_PRODUCTS, JSON.stringify(favorites));
}



export async function getDataFavoriteProduct  () {
  const stored = localStorage.getItem(OPTIONS_KEY_FAVORITE_PRODUCTS);
  try {
    const settings = JSON.parse(stored as string);
    const response = await fetch(
  `${urlServerNode}/api/favorite/productsDui/json`,
  {
    method: 'POST',
    body: JSON.stringify({
      favoriteData: settings
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
    return 'No se encontraron datos en localStorage para la clave: ' + OPTIONS_KEY_FAVORITE_PRODUCTS;
  }
}

export function removeAllProductFavorite() {
  localStorage.removeItem(OPTIONS_KEY_FAVORITE_PRODUCTS);
  console.log('Todos los elementos han sido eliminados del carrito.');
}

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

export function addToFavoriteProducts({dui}: {dui: string}) {
  console.log('Agregando a la lista de Favorito:', {dui});
  const cart = getDataFavoriteProducts() || [];
  const existingItem = cart.find((item: { dui: string; }) => item.dui === dui);

  cart.push({existingItem});
  localStorage.setItem(OPTIONS_KEY_FAVORITE_PRODUCTS, JSON.stringify(cart));
  console.log('Datos guardados en localStorage para la clave:', OPTIONS_KEY_FAVORITE_PRODUCTS);
}
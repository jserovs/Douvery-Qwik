import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './card-favorite.css?inline';
import {
  getDataFavoriteProduct,
  removeAllProductFavorite,
} from '~/services/cart/favorite-product';
import type { Product } from '~/utils/types';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { addToCart } from '~/services/cart/cart';
import { Card2SCART } from '~/components/cards/cart/card-2-s/card-2-s';

interface IState {
  searchInput: string;
  searchResults: Product[];
  selectedValue: string;
}

export const CardFavoriteProduct = component$(() => {
  useStylesScoped$(styles);
  const state = useStore<IState>({
    searchInput: '',
    searchResults: [],
    selectedValue: '',
  });
  const isLoading = useStore({ setIsLoading: true });

  const { url } = useLocation();
  useVisibleTask$(async ({ track }) => {
    track(() => url.pathname);
    const controller = new AbortController();

    try {
      state.searchResults = await getDataFavoriteProduct();
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.setIsLoading = false;
    }
    return () => {
      controller.abort();
    };
  });
  const nav = useNavigate();
  return (
    <>
      <div class="cart-future-shop">
        <h3 class="container-titulo">Marcados como favoritos</h3>
        <ul class="container-lista">
          {isLoading.setIsLoading ? (
            <div class="loader"></div>
          ) : state.searchResults.length > 0 ? (
            state.searchResults.map((product) => {
              return (
                <>
                  <div class="container-cart" key={product.dui}>
                    <Card2SCART product={product} />
                    <div class="container-button-cart">
                      <button
                        onClick$={() => {
                          addToCart({ dui: product.dui, quantity: 1 });
                          nav('/v/cart');
                        }}
                      >
                        Agregar al carrito
                      </button>
                    </div>
                  </div>
                </>
              );
            })
          ) : (
            <div class="no-product-message">
              <p>No hay productos en Favorito.</p>
            </div>
          )}
          <div class="container-list-empty">
            <button
              onClick$={() => {
                removeAllProductFavorite();
                nav('/v/cart');
              }}
            >
              Limpiar lista
            </button>
          </div>
        </ul>
      </div>
    </>
  );
});

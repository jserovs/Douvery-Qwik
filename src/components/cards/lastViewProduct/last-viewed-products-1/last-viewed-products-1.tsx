import {
    component$,
    useStore,
    useStylesScoped$,
    useVisibleTask$,
  } from '@builder.io/qwik';
  import styles from './last-viewed-products-1.css?inline';
  import {
    getDataFavoriteProduct,
    removeAllProductFavorite,
  } from '~/services/cart/favorite-product';
  import type { Product } from '~/utils/types';
  import { useLocation, useNavigate } from '@builder.io/qwik-city';
  import { addToCart } from '~/services/cart/cart';
  import { Card2SCART } from '~/components/cards/cart/card-2-s/card-2-s';
import { getDataViewedProduct } from '~/services/viewed/viewed';
import { ContainerCardProduct4 } from '../../product/product-card-4/product-card-4';
import { Carousel1 } from '~/components/use/carousel/carousel-1/carousel-1';
  
  interface IState {
    searchInput: string;
    searchResults: Product[];
    selectedValue: string;
  }
  
  export const CardLastViewedProducts1 = component$(() => {
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
        state.searchResults = await getDataViewedProduct();
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
                <Carousel1 styleCard={4} product={  state.searchResults}  />
                      
             
            ) : (
              <div class="no-product-message">
                <p>No hay productos en Favorito.</p>
              </div>
            )}
            
          </ul>
        </div>
      </>
    );
  });
  
import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import styles from './last-viewed-products-1.css?inline';

import type { Product } from '~/utils/types';
import { useLocation } from '@builder.io/qwik-city';

import { getDataViewedProduct } from '~/services/viewed/viewed';

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

  return (
    <>
      <div class="category-card">
        <div class="category-info">
          <h1>Ultimos productos vistos</h1>
        </div>
        <div class="category-img">
          {isLoading.setIsLoading ? (
            <div class="loader"></div>
          ) : state.searchResults.length > 0 ? (
            <>
              {state.searchResults.map((product: any, index: any) => {
                return (
                  <div class="image-container" key={index}>
                    <img src={product.images[0]} alt="" />
                  </div>
                );
              })}
            </>
          ) : (
            <div class="no-product-message">
              <p>No hay productos en Favorito.</p>
            </div>
          )}
        </div>
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
    </>
  );
});

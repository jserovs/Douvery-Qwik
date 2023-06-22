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
import { UseProductDetailsLink } from '~/services/fuction';

interface IState {
  searchInput: string;
  searchResults: Product[];
  selectedValue: string;
}

export const CardLastViewedProducts1 = component$(({ ref }: any) => {
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
      const results = await getDataViewedProduct();
      if (!Array.isArray(results)) {
        console.error('getDataViewedProduct did not return an array:', results);
        state.searchResults = [];
      } else {
        state.searchResults = results;
      }
    } catch (error) {
      console.error('Error getting data:', error);
      state.searchResults = [];
    }
    isLoading.setIsLoading = false;
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
        <div class="scroll-container">
          <div class="category-img">
            {isLoading.setIsLoading ? (
              <div class="loader"></div>
            ) : state.searchResults.length != 0 ? (
              <>
                {state.searchResults.map((product: any, index: any) => {
                  return (
                    <a href={UseProductDetailsLink(product, ref)} key={index}>
                      <div class="image-container" key={index}>
                        <img
                          width={100}
                          height={70}
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                    </a>
                  );
                })}
              </>
            ) : (
              <div class="no-product-message">
                <p>Todavía no has explorado ningún producto.</p>
              </div>
            )}
          </div>
        </div>

        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
    </>
  );
});

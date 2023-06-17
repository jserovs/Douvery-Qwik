import {
  component$,
  useVisibleTask$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './carousel-pupular-products-all.css?inline';
import type { Product } from '~/utils/types';
import { fetchAllPopularProducts } from '~/services/fechProduct';
import { randomNum } from '~/services/fuction';

import { Carousel2 } from '~/components/use/carousel/carousel-2/carousel-2';

export const Promotion_Carousel__PopularProductsAll = component$(
  ({ styleNumber }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      isLoading: true,
      products: [] as Product[]
    });

    useVisibleTask$(async () => {
      const controller = new AbortController();
      try {
        const results = await fetchAllPopularProducts(controller);
        state.products = results;
      } catch (error) {
        console.error('Error getting data:', error);
        state.products = [];
      }
      state.isLoading = false;
      return () => {
        controller.abort();
      };
    });

    const randomNumber = randomNum();
    return (
      <div class="ctnr-view-5">
        {' '}
        <div class="content-carousel">
          {
            state.isLoading ?
            <div class="loader"></div> :
            state.products.length === 0 ?
            <p>No hay productos para mostrar.</p> :
            <Carousel2
              key={randomNumber}
              styleCard={styleNumber || randomNumber}
              product={state.products}
            />
          }
          <br />
        </div>
      </div>
    );
  }
);

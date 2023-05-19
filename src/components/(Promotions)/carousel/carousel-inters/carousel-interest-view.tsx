import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import style from './carousel-interest-view.css?inline';
import { Carousel1 } from '~/components/use/carousel/carousel-1/carousel-1';
import type { Product } from '~/utils/types';
import { fetchProductU } from '~/services/fechProduct';
import { randomNum } from '~/services/fuction';
import { useLocation } from '@builder.io/qwik-city';
export const Promotion_CarouselInterestViews = component$(
  ({ styleNumber }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      productResults: [] as Product[],
    });
    const loc = useLocation();

    useTask$(async ({ track }) => {
      track(() => loc);

      const controller = new AbortController();
      state.productResults = await fetchProductU(25);

      return () => {
        controller.abort();
      };
    });

    const randomNumber = randomNum();
    return (
      <div class="ctnr-view-5">
        {' '}
        <Carousel1
          styleCard={styleNumber || randomNumber}
          product={state.productResults}
        />
      </div>
    );
  }
);

import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import style from './carousel-interest-view.css?inline';
import type { Product } from '~/utils/types';
import { fetchProductU } from '~/services/fechProduct';
import { randomNum } from '~/services/fuction';
import { useLocation } from '@builder.io/qwik-city';
import { Carousel2 } from '~/components/use/carousel/carousel-2/carousel-2';
export const Promotion_CarouselInterestViews = component$(
  ({ styleNumber, ref }: any) => {
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
        <Carousel2
          ref={ref}
          styleCard={styleNumber || randomNumber}
          product={state.productResults}
        />
      </div>
    );
  }
);

import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import style from './carousel-recomend-last-view-product.css?inline';
import type { Product } from '~/utils/types';
import { fetchSystemRecomendationProductU } from '~/services/fechProduct';
import { randomNum } from '~/services/fuction';

import { getLastItemViewedDui } from '~/services/viewed/viewed';
import { Carousel3 } from '~/components/use/carousel/carousel-3/carousel-3';
export const PromotionRecomend_Carousel_LastView = component$(
  ({ styleNumber }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      productResults: [] as Product[],
    });
    const lastViewDui = useSignal('');

    useVisibleTask$(async () => {
      const controller = new AbortController();
      const dui = getLastItemViewedDui();
      lastViewDui.value = dui;
      state.productResults = await fetchSystemRecomendationProductU(dui,25);

      return () => {
        controller.abort();
      };
    });

    const randomNumber = randomNum();
    return (
      <div class="ctnr-view-5" key={randomNumber}>
        {' '}
        <div class="content-carousel">
          {lastViewDui.value === null ? (
            <></>
          ) : (
            <Carousel3
              key={randomNumber}
              styleCard={styleNumber || randomNumber}
              product={state.productResults}
            />
          )}
          <br />
        </div>
      </div>
    );
  }
);

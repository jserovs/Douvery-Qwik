import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import style from './carousel-recomend-5last-view-product.css?inline';
import type { Product } from '~/utils/types';
import { randomNum } from '~/services/fuction';

import { getLastItemViewedDui } from '~/services/viewed/viewed';
import { Carousel3 } from '~/components/use/carousel/carousel-3/carousel-3';
import { useGetCurrentUser } from '~/routes/layout';
import { fetchSystemRecomendation_5lastViewedProducts } from '~/services/fechProduct';
export const PromotionRecomend_Carousel_5LastView = component$(
  ({ styleNumber, ref }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      productResults: [] as Product[],
    });
    const lastViewDui = useSignal('');
    const user = useGetCurrentUser().value;
    useVisibleTask$(async () => {
      const controller = new AbortController();
      const dui = getLastItemViewedDui();
      lastViewDui.value = dui;
      state.productResults = await fetchSystemRecomendation_5lastViewedProducts(
        user?.id || '',
        25
      );

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
              ref={ref}
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

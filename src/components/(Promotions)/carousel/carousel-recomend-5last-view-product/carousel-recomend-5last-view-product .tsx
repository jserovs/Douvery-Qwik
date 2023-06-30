import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './carousel-recomend-5last-view-product.css?inline';
import type { Product } from '~/utils/types';
import { randomNum } from '~/services/fuction';

import { Carousel3 } from '~/components/use/carousel/carousel-3/carousel-3';
import { useGetCurrentUser } from '~/routes/layout';
import { fetchSystemRecomendation_5lastViewedProducts } from '~/services/fechProduct';
export const PromotionRecomend_Carousel_5LastView = component$(
  ({ styleNumber, ref }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      productResults: [] as Product[],
    });

    const user = useGetCurrentUser().value;

    const productReducer = useResource$<Product[]>(async ({ cleanup }) => {
      const controller = new AbortController();
      cleanup(() => controller.abort());

      const data = await fetchSystemRecomendation_5lastViewedProducts(
        user?.id || '',
        25
      );
      state.productResults = data;

      return data;
    });

    const randomNumber = randomNum();

    return (
      <>
        {' '}
        <Resource
          value={productReducer}
          onPending={() => <div class="loader"></div>}
          onRejected={() => <></>}
          onResolved={(data: any) => (
            <>
              {data.length === 0 ? (
                <></>
              ) : (
                <>
                  {' '}
                  <br />
                  <div class="title-show">
                    <h2> Basado en tus productos vistos.</h2>
                    <div class="show-more">
                      {' '}
                      <a href="dsaf/">Ver mas</a>
                    </div>
                  </div>
                  <Carousel3
                    ref={ref}
                    key={randomNumber}
                    styleCard={styleNumber || randomNumber}
                    product={data}
                  />
                  <br />
                </>
              )}
            </>
          )}
        />
        <br />
      </>
    );
  }
);

import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './carousel-pupular-products-all.css?inline';
import type { Product } from '~/utils/types';
import { fetchAllPopularProducts } from '~/services/fechProduct';
import { randomNum } from '~/services/fuction';

import { Carousel2 } from '~/components/use/carousel/carousel-2/carousel-2';
export const Promotion_Carousel__PopularProductsAll = component$(
  ({ styleNumber, ref }: any) => {
    useStylesScoped$(style);
    const state = useStore({
      loader: true,
      product: [] as Product[],
    });

    const productReducer = useResource$<Product[]>(async ({ cleanup }) => {
      const controller = new AbortController();
      cleanup(() => controller.abort());

      const data = await fetchAllPopularProducts(controller);
      state.product = data;
      state.loader = false;
      return data;
    });

    const randomNumber = randomNum();
    return (
      <div class="ctnr-view-5">
        {' '}
        <div class="content-carousel">
          <Resource
            value={productReducer}
            onPending={() => <div class="loader"></div>}
            onRejected={() => (
              <>
                Al parecer, hay un error en la solicitud. Por favor, actualiza
                la página para verificar nuevamente.
              </>
            )}
            onResolved={() => (
              <>
                <Carousel2
                  ref={ref}
                  key={randomNumber}
                  styleCard={styleNumber || randomNumber}
                  product={state.product}
                />
              </>
            )}
          />

          <br />
        </div>
      </div>
    );
  }
);

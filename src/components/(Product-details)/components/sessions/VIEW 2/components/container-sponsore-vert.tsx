import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './css/container-sponsore.css?inline';

import type { Product } from '~/utils/types';
import { fetchSystemRecomendationProductU } from '~/services/fechProduct';
import { ContainerCardProduct9 } from '~/components/cards/product/product-card-9/product-card-9';

export const SponsoredProductContainer = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const state = useStore({
    productResults: [] as Product[],
  });

  useTask$(async ({ track }) => {
    track(() => product.dui);

    const dui = product.dui;
    const controller = new AbortController();
    state.productResults = await fetchSystemRecomendationProductU(dui, 1);

    return () => {
      controller.abort();
    };
  });

  return (
    <>
      {' '}
      {product.sponsored === true ? (
        <></>
      ) : (
        <>
          <div class="crtrs-bsc">
            <div class="div-car">
              {' '}
              {state.productResults.map((val: any, key: any) => (
                <div key={key}>
                  <ContainerCardProduct9 product={val} />
                </div>
              ))}
              <div> </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

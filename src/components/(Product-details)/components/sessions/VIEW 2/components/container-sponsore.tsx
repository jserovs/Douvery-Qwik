import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './css/container-sponsore.css?inline';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';
import { DouveryArrowRigth1 } from '~/components/icons/arrow-right-1';

import type { Product } from '~/utils/types';
import { fetchProductCategory } from '~/services/fechProduct';

export const ContainerSponsoreProduct = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const state = useStore({
    productResults: [] as Product[],
  });

  useTask$(async ({ track }) => {
    track(() => product.dui);
    const category = product.category;
    const dui = product.dui;
    const controller = new AbortController();
    state.productResults = await fetchProductCategory(category, dui);

    return () => {
      controller.abort();
    };
  });
  return (
    <div class="crtrs-bsc">
      <div class="crrts-title">
        <hs-sr3>Pueden ser de tu interés</hs-sr3>
        <div class="sr-of">
          {' '}
          <div class="ssr-f">
            {' '}
            <p-sr1> Ver mas</p-sr1>
            <DouveryArrowRigth1 size="20" />
          </div>
        </div>
      </div>
      <div class="div-car">
        {' '}
        {state.productResults.map((val: any, key: any) => (
          <div key={key}>
            <ContainerCardProduct1 product={val} />
          </div>
        ))}
        <div> </div>
      </div>
    </div>
  );
});

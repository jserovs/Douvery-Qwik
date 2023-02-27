import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import style from './view5.css?inline';
import { Carousel1 } from '~/components/use/carousel/carousel-1/carousel-1';
import type { Product } from '~/utils/types';
import { fetchProductU } from '~/services/fechProduct';
export const View5 = component$(({ product }: any) => {
  useStylesScoped$(style);
  const state = useStore({
    productResults: [] as Product[],
  });

  useTask$(async ({ track }) => {
    track(() => product.dui);

    const controller = new AbortController();
    state.productResults = await fetchProductU(25);

    return () => {
      controller.abort();
    };
  });
  return (
    <div class="ctnr-view-5">
      {' '}
      <div class="content-carousel">
        <p class="ps-sr1">Puede que te interesen </p>
        <Carousel1 styleCard={2} product={state.productResults} />
      </div>
    </div>
  );
});

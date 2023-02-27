import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import style from './view3.css?inline';
import { Carousel1 } from '~/components/use/carousel/carousel-1/carousel-1';
import type { Product } from '~/utils/types';
import { fetchSystemRecomendationProductU } from '~/services/fechProduct';
export const View3 = component$(({ product }: any) => {
  useStylesScoped$(style);
  const state = useStore({
    productResults: [] as Product[],
  });

  useTask$(async ({ track }) => {
    track(() => product.dui);
    const dui = product.dui;
    const controller = new AbortController();
    state.productResults = await fetchSystemRecomendationProductU(dui);

    return () => {
      controller.abort();
    };
  });
  return (
    <div class="ctnr-view-3">
      {' '}
      <div class="content">
        <div class="crrts-title">
          <div class="ofrs">
            <hs-sr3>Detalles del producto</hs-sr3>
            <div class="srs-v">
              <a class="ps-sr1">Saber mas</a>
            </div>
          </div>
          <p class="ps-sr1">Detalles interesantes del producto</p>
          <div class="srs-md">
            <a class="ps-sr1">Saber mas</a>
          </div>
        </div>
      </div>
      <div class="content-carousel">
        <p class="ps-sr1">Productos similares</p>
        <Carousel1 product={state.productResults} />
      </div>
    </div>
  );
});

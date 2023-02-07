import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-sponsore.css?inline';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';

export const ContainerSponsoreProduct = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="crtrs-bsc">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Articulos similares en ofertas</hs-sr3>
          <div class="srs-v">
            <a-sr1-info>Saber mas</a-sr1-info>
          </div>
        </div>

        <p-sr1>Articulos en ofertas que te puede interesar</p-sr1>
        <div class="scss-md">
          <a-sr1-info>Saber mas</a-sr1-info>
        </div>
      </div>
      <div class="div-car">
        {' '}
        <ContainerCardProduct1 />
      </div>
    </div>
  );
});

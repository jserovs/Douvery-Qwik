import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-sponsore.css?inline';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';
import { DouveryArrowRigth1 } from '~/components/icons/arrow-right-1';

export const ContainerSponsoreProduct = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="crtrs-bsc">
      <div class="crrts-title">
        <p-sr1>
          Productos a precios reducidos que pueden ser de tu interés
        </p-sr1>
      </div>
      <div class="div-car">
        {' '}
        <ContainerCardProduct1 />
      </div>
      <div class="sr-of">
        {' '}
        <p-sr1>Sponsor</p-sr1>
        <div class="ssr-f">
          {' '}
          <p-sr1> Ver ofertas</p-sr1>
          <DouveryArrowRigth1 size="20" />
        </div>
      </div>
    </div>
  );
});

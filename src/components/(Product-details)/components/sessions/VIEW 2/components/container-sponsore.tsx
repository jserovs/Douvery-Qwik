import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-basic-info.css?inline';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';

export const ContainerSponsoreProduct = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="crtrs-bsc">
      <ContainerCardProduct1 />
      <p-sr1>Sponsore</p-sr1>
    </div>
  );
});

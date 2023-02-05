import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-agg.css?inline';
import { ContainerButtonCart } from '~/components/buttons/cart/container-buttton-cart';

export const ContainerCombinedAGG = component$(({ totalPrice }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="crtr-combined-info">
      <div class="price-conmbr">
        {' '}
        <div class="obts">
          <p-sr1>Descuento al comprar</p-sr1>
          <hs-sr1> -10% </hs-sr1>
        </div>{' '}
        <div class="obts">
          <p-sr1> Total </p-sr1>
          <hs-sr1> {totalPrice} </hs-sr1>
        </div>{' '}
      </div>
      <ContainerButtonCart />
    </div>
  );
});

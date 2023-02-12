import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-agg.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { ContainerButtonCombined } from '~/components/buttons/cart/container-buttton-combined';

export const ContainerCombinedAGG = component$(
  ({ totalPrice, discount }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="crtr-combined-info">
        <div class="price-conmbr">
          {' '}
          <hs-sr1>Detalles</hs-sr1>
          <div class="obts">
            <div class="dr-ls">
              {' '}
              <p-sr1>Descuento al comprar</p-sr1>
            </div>
            <div class="dr-ms">
              {' '}
              <p-sr1>Descuento</p-sr1>
            </div>
            <hs-sr1> -{discount}% </hs-sr1>
          </div>{' '}
          <div class="obts">
            <p-sr1> Total </p-sr1>
            <hs-sr1>
              <UsePrice price={totalPrice} />{' '}
            </hs-sr1>
          </div>{' '}
        </div>
        <div class="crts-bts">
          {' '}
          <ContainerButtonCombined />
        </div>
      </div>
    );
  }
);

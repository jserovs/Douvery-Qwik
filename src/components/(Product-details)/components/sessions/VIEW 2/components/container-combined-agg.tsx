import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-agg.css?inline';
import { UsePrice } from '~/components/use/price/price';
//import { ContainerButtonCombined } from '~/components/buttons/cart/container-buttton-combined';
import { BottonDisable } from '~/components/buttons/botton-disable/botton-disable';

export const ContainerCombinedAGG = component$(
  ({ totalPrice, discount }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="crtr-combined-info">
        <div class="price-conmbr">
          {' '}
          <strong class="hs-sr1">Detalles</strong>
          <div class="obts">
            <div class="dr-ls">
              {' '}
              <p class="ps-sr1">Descuento al comprar</p>
            </div>
            <div class="dr-ms">
              {' '}
              <p class="ps-sr1">Descuento</p>
            </div>
            <strong class="hs-sr1"> -{discount}% </strong>
          </div>{' '}
          <div class="obts">
            <p class="ps-sr1"> Total </p>
            <strong class="hs-sr1">
              <UsePrice price={totalPrice} />{' '}
            </strong>
          </div>{' '}
        </div>
        <div class="crts-bts">
          {' '}
          <BottonDisable />
          {/* <ContainerButtonCombined /> */}
        </div>
      </div>
    );
  }
);

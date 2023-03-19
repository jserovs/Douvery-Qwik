import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-subtotal.css?inline';
import { UsePrice } from '~/components/use/price/price';
export const CardSubtotal = component$(({ state, subTotal }: any) => {
  useStylesScoped$(styles);
  return (
    <>
      <div class="container-card-subtotal">
        <div class="cart-subtotal">
          <ul class="container-lista-subtotal">
            <li>
              <div class="tll-ttl-prod">Total producto:</div>{' '}
              <span id="total" class="container-valor">
                {state}
              </span>
            </li>
          </ul>
          <div class="container-subtotal">
            <h3 class="container-titulo-subtotal">Subtotal compra:</h3>
            <strong class="subtotal">
              <UsePrice price={subTotal.setsubTotal} />
            </strong>
          </div>
        </div>
      </div>
    </>
  );
});

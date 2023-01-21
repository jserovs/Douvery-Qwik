import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryCart } from '~/components/icons/cart';
import { DouveryPayIconBTC } from '~/components/icons/pay-icon-btc';
import styles from './css/container-button-details.css?inline';

import { ContainerInputCartPay } from './container-input-cart-pay';
export const ContainerButtonDetails = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return (
    <div>
      <div class="button-lapto">
        <size-w class="size-w-10" />
        {props.quantity <= 1 ? (
          <></>
        ) : (
          <>
            <size-w class="size-w-10" />{' '}
            <button class="buttonCart">
              <DouveryCart size="20px" /> Añadir al carrito
            </button>
            <size-w class="size-w-10" />{' '}
            <button class="buttonPay">
              {' '}
              <DouveryPayIconBTC size="20" /> Pagar
            </button>
          </>
        )}
      </div>
      <div class="crt-button-mobiles">
        <div class="button-mobiles">
          {props.quantity <= 1 ? (
            <></>
          ) : (
            <>
              <div class="brt-irft">
                <div class="slect-qty-prt">
                  <p>Cantidad : </p>
                  <size-w class="size-w-10" />
                  <ContainerInputCartPay quantity={1} />
                </div>
              </div>
              <button class="buttonCart">
                <DouveryCart size="20px" /> Añadir al carrito
              </button>
              <size-w class="size-w-10" />{' '}
              <button class="buttonPay">
                {' '}
                <DouveryPayIconBTC size="20" /> Pagar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

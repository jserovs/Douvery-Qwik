import { component$, useStylesScoped$ } from '@builder.io/qwik';

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
            <button class="buttonCart">Agregar al carrito</button>
            <size-w class="size-w-10" />{' '}
            <button class="buttonPay"> Pagar</button>
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
              <button class="buttonCart">Agregar al carrito</button>
              <size-w class="size-w-10" />{' '}
              <button class="buttonPay"> Pagar</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
});

import { $, component$,  useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-button-details.css?inline';

import { addToCart } from '~/services/cart/cart';

export const ContainerButtonDetails = component$(
  ({ product, quantity }: any) => {
    useStylesScoped$(styles);
    const AddCart = $(() => {
      addToCart({
        dui: product.dui,
        quantity: quantity,
      });
    });
   
    return (
      <div>
        <div class="button-lapto">
          <size-w class="size-w-10" />
          {product.quantity <= 1 ? (
            <></>
          ) : (
            <>
              <size-w class="size-w-10" />{' '}
              <button class="buttonCart" onClick$={AddCart}>
                Agregar al carrito
              </button>
              <size-w class="size-w-10" />{' '}
              <button class="buttonPay"> Pagar</button>
            </>
          )}
        </div>
        <div class="crt-button-mobiles">
          <div class="button-mobiles">
            {product.quantity <= 1 ? (
              <></>
            ) : (
              <>
              
                <button class="buttonCart" onClick$={AddCart}>Agregar al carrito</button>
                <size-w class="size-w-10" />{' '}
                <button class="buttonPay"> Pagar</button>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
);

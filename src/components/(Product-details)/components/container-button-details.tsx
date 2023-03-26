import { $, component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-button-details.css?inline';

import { addToCart } from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';

export const ContainerButtonDetails = component$(
  ({ product, quantity }: any) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const AddCart = $(() => {
      addToCart({
        dui: product.dui,
        quantity: quantity,
      });
      nav('/v/cart/');
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
                <button class="buttonCart" onClick$={AddCart}>
                  Agregar al carrito
                </button>
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

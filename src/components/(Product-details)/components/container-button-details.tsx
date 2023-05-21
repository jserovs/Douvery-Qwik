import { $, component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-button-details.css?inline';

import { addToCart } from '~/services/cart/cart';
import { useNavigate } from '@builder.io/qwik-city';
import { DouveryCheckMark } from '~/components/icons/checkMark';

export const AddCart = $(({ product, quantity, nav, isLoader }: any) => {
  const result = addToCart({
    dui: product.dui,
    quantity: quantity,
  });
  if (result.success) {
    isLoader.value = true;

    nav && nav('/v/cart/');
  } else {
    console.error('Error, ', result.error);
  }
});

export const ContainerButtonDetails = component$(
  ({ product, quantity }: any) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const isLoader = useSignal(false);

    return (
      <div>
        <div class="button-lapto">
          <size-w class="size-w-10" />
          {product.quantity <= 1 ? (
            <></>
          ) : (
            <>
              <size-w class="size-w-10" />{' '}
              <button
                class="buttonCart"
                onClick$={() => AddCart({ product, quantity, nav, isLoader })}
              >
                {isLoader.value == true ? (
                  <div class="check">
                    {' '}
                    <DouveryCheckMark size="15px" />
                  </div>
                ) : (
                  <></>
                )}{' '}
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
                <button
                  class="buttonCart"
                  onClick$={() => AddCart({ product, quantity, nav, isLoader })}
                >
                  {isLoader.value == true ? <div class="loader"></div> : <></>}{' '}
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

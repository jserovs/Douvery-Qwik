import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

import styles from './buttons-cart.css?inline';

import { useNavigate } from '@builder.io/qwik-city';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { AddCart } from '../../container-button-details';

export const ButtonDetailVerticalContainer = component$(
  ({ product, quantity }: any) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
    const isLoader = useSignal(false);

    return (
      <>
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
        </div>
      </>
    );
  }
);

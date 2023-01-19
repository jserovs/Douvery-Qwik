import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { DouveryCart } from '~/components/icons/cart';
import { DouveryPayIconBTC } from '~/components/icons/pay-icon-btc';
import styles from './css/container-button-details.css?inline';
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
      <div class="button-mobiles">
        {props.quantity <= 1 ? (
          <></>
        ) : (
          <>
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
  );
});

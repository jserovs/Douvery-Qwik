import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-total.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { ButtonFollow } from '../../buttons/button-follow/button-follow';
export const CardTotal = component$(
  ({ subTotal, discount, subTotalNoDiscount }: any) => {
    useStylesScoped$(styles);
    return (
      <>
        <div class="cart-total">
          <h3 class="container-titulo">Resumen de la compra</h3>
          <ul class="container-lista">
            {discount.setDiscount > 0 ? (
              <>
                {' '}
                <li>
                  Anteriormente:{' '}
                  <span id="descuentos" class="container-valor">
                    <UsePrice price={subTotalNoDiscount} />
                  </span>
                </li>
              </>
            ) : (
              <></>
            )}
            <li>
              Descuentos:{' '}
              <span id="descuentos" class="container-valor">
                <UsePrice price={discount.setDiscount} />
              </span>
            </li>

            <li>
              Subtotal:{' '}
              <span id="subtotal" class="container-valor">
                <UsePrice price={subTotal.setsubTotal} />
              </span>
            </li>
          </ul>
          <ButtonFollow />
        </div>
      </>
    );
  }
);

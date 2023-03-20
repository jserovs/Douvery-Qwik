import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-total.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { DouveryArrowRigth1 } from '~/components/icons/arrow-right-1';
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
          <button id="siguiente" class="container-boton">
            <div class="text-button">Proceder a pagar</div>
            <div class="animation-ir">
              Ir <DouveryArrowRigth1 size="16px" />
            </div>
          </button>
        </div>
      </>
    );
  }
);

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './info-pay.css?inline';
import { UsePrice } from '~/components/use/price/price';

export const InfoPay = component$(
  ({
    totalAmount,
    shipping,
    taxAmount,
    subTotal,
    discount,
    subTotalNoDiscount,
  }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="container-all">
        {' '}
        <div class="container-title">
          <p>Order Summary</p>
        </div>
        <div class="container-discount">
          <ul>
            <li>Subtotal before</li>
            <li>
              <UsePrice price={subTotalNoDiscount} />
            </li>
          </ul>
          <ul>
            <li>Discount</li>
            <li>
              <UsePrice price={discount} />
            </li>
          </ul>
        </div>
        <div class="container-now">
          <ul>
            <li>Subtotal now</li>
            <li>
              {' '}
              <UsePrice price={subTotal} />
            </li>
          </ul>
          <ul>
            <li>Shipping</li>
            <li>
              {' '}
              <UsePrice price={shipping} />
            </li>
          </ul>
          <ul>
            <li>Taxt</li>
            <li>
              {' '}
              <UsePrice price={taxAmount} />
            </li>
          </ul>
        </div>
        <div class="container-total">
          <ul>
            <li>
              <strong>Total</strong>
            </li>
            <li>
              <strong> ${totalAmount}</strong>
            </li>
          </ul>
        </div>
        <div class="container-terms-services">
          <div class="terms-and-conditions">
            {' '}
            <p>
              Al continuar, aceptas nuestros{' '}
              <a href="#">Términos y condiciones</a>.
            </p>
          </div>
        </div>
        <div class="container-buttons-pay">
          <button class="paypal-button">
            <i class="fab fa-paypal"></i> Pagar con PayPal
          </button>
        </div>
      </div>
    );
  }
);

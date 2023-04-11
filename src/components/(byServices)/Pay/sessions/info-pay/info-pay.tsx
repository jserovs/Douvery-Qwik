import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './info-pay.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { ButtonCreditCard } from '../../components/method-pay/credit-card/credit-card';

import { PaypalMethod } from '../../components/method-pay/paypal/paypal-method';
import { CriptoUsdtMethod } from '../../components/method-pay/cripto-usdt/cripto-usdt';

export const InfoPay = component$(
  ({
    car_product,
    totalAmount,
    shipping,
    taxAmount,
    subTotal,
    discount,
    subTotalNoDiscount,
    selectedMethod,
    address,
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
          {selectedMethod.setSelectedMethod === 'paypal' ? (
            <PaypalMethod
              car_product={car_product}
              taxAmount={taxAmount}
              address={address}
              shipping={shipping}
              totalAmount={totalAmount}
              subTotal={subTotal}
              discount={discount}
              subTotalNoDiscount={subTotalNoDiscount}
              selectedMethod={selectedMethod}
            />
          ) : (
            ''
          )}{' '}
          {selectedMethod.setSelectedMethod === 'card' ? (
            <ButtonCreditCard
              car_product={car_product}
              taxAmount={taxAmount}
              address={address}
              shipping={shipping}
              totalAmount={totalAmount}
              subTotal={subTotal}
              discount={discount}
              subTotalNoDiscount={subTotalNoDiscount}
              selectedMethod={selectedMethod}
            />
          ) : (
            ''
          )}
          {selectedMethod.setSelectedMethod === 'crypto-usdt' ? (
            <CriptoUsdtMethod />
          ) : (
            ''
          )}{' '}
        </div>
      </div>
    );
  }
);

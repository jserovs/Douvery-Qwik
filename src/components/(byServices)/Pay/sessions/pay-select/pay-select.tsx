import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './pay-select.css?inline';
import { PaypalIcon } from '~/components/icons/paypal';
import { DouveryUsdtIcon } from '~/components/icons/usdt';
import { DouveryCard } from '~/components/icons/card';
export const PaySelectCheckout = component$(({ selectedMethod }: any) => {
  useStylesScoped$(styles);

  const handleMethodChange = $((event: any) => {
    selectedMethod.value = event.target.value;
  });

  return (
    <div class="container-all">
      <div class="container-title">
        <p>Metodos de pagos</p>
      </div>
      <div class="payment-methods">
        <div>
          <input
            type="radio"
            id="paypal"
            name="payment-method"
            value="paypal"
            checked={selectedMethod === 'paypal'}
            onChange$={handleMethodChange}
          />

          <label for="paypal">
            <PaypalIcon size="35px" /> PayPal
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="card"
            name="payment-method"
            value="card"
            checked={selectedMethod.value == 'card'}
            onChange$={handleMethodChange}
          />
          <label for="card">
            <DouveryCard /> Pagar con Tarjeta
          </label>
        </div>

        <div>
          <input
            type="radio"
            id="crypto-usdt"
            name="payment-method"
            value="crypto-usdt"
            checked={selectedMethod === 'crypto-usdt'}
            onChange$={handleMethodChange}
          />
          <label for="crypto-usdt">
            <DouveryUsdtIcon size="32" />
            Pagar con USDT
          </label>
        </div>
      </div>
    </div>
  );
});

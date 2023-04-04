import { $, component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './pay-select.css?inline';
import { PaypalIcon } from '~/components/icons/paypal';
import { DouveryUsdtIcon } from '~/components/icons/usdt';
import { DouveryCard } from '~/components/icons/card';
export const PaySelectCheckout = component$(({ selectedMethod }: any) => {
  useStylesScoped$(styles);

  const handleMethodChange = $((event: any) => {
    selectedMethod.setSelectedMethod = event.target.value;
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
            checked={selectedMethod.setSelectedMethod === 'paypal'}
            onChange$={handleMethodChange}
          />

          <label for="paypal">
            <PaypalIcon size="35px" /> PayPal
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="tarjeta"
            name="payment-method"
            value="tarjeta"
            checked={selectedMethod.setSelectedMethod === 'tarjeta'}
            onChange$={handleMethodChange}
          />
          <label for="tarjeta">
            <DouveryCard /> Pagar con Tarjeta
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="bitcoin"
            name="payment-method"
            value="bitcoin"
            checked={selectedMethod.setSelectedMethod === 'bitcoin'}
            onChange$={handleMethodChange}
          />
          <label for="bitcoin">
            <DouveryUsdtIcon size="32" />
            Pagar con USDT
          </label>
        </div>
      </div>
    </div>
  );
});

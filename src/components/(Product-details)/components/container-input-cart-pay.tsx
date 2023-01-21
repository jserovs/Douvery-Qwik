import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-input-cart-pay.css?inline';
export const ContainerInputCartPay = component$(({ quantity }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="caja">
      <select>
        <option selected value="1">
          {quantity}
        </option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    </div>
  );
});

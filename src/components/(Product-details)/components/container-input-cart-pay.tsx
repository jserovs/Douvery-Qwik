import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-input-cart-pay.css?inline';
export const ContainerInputCartPay = component$(({ quantity }: any) => {
  useStylesScoped$(styles);
  console.log(quantity)
  return (
    <div class="select-input-cart">
       <select
                  value={quantity}
                  onChange$={(event) =>
                    (quantity = event.target.value)
                  }
                >
                  <option value="1" selected>1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
    </div>
  );
});

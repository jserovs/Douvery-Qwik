import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-input-cart-pay.css?inline';
export const ContainerInputCartPay = component$(({ quantity }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="inpt-nbr">
      <input
        required={true}
        type="number"
        class="
                  form-control
                  block
                  w-full
                  px-3
                  py-1.5
                  text-base
                  font-normal
                  text-gray-700
                  bg-white bg-clip-padding
                  border border-solid border-gray-300
                  rounded
                  transition
                  ease-in-out
                  m-0
                  focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
                "
        id="exampleNumber0"
        max="10"
        min="1"
        step="1"
        value={quantity}
      />
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './buttons-purchases.css?inline';


import { DropdownOptionsFuturePurchases } from '../dropdowm/dropdown';


export const ButtonFuturePurchase = component$(({ product }: any) => {
  useStylesScoped$(styles);

product
  return (
    <div class="buttos-cart">
      <div class="button-shared">
        <DropdownOptionsFuturePurchases product={product} />
      </div>
      
    </div>
  );
});

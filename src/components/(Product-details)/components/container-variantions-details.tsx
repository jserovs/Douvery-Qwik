import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { CardProductVariations1 } from '~/components/cards/product-variant/card-product-variant';
import styles from './css/container-variantions-details.css?inline';
export default component$(({ props }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="super-container-options-product">
      {props.variations.map((val: any) => (
        <div class="container-variation-product">
          <size-w class="size-w-10" />
          <div class="col-auto">
            {val.nameVariation}
            <size-w class="size-w-10" />
            <div class="container-variation-cont-most">
              {val.productVariation.map((val: any) => (
                <CardProductVariations1 dui={val} slug={props} />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

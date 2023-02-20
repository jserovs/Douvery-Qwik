import { component$, useStylesScoped$ } from '@builder.io/qwik';

import { CardProductVariations1 } from '~/components/cards/product-variant/card-product-variant';
import styles from './css/container-variantions-details.css?inline';
export default component$(({ props, imgS, imgP }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="super-container-options-product">
      {props.variations.map((val: any, key: any) => (
        <div key={key} class="container-variation-product">
          <size-w class="size-w-10" />
          <div class="col-auto">
            <div class="ttle-variant">
              {' '}
              <strong class="hs-sr1">{val.nameVariation}:</strong>
              <p class="ps-sr1">Prox ...</p>
            </div>
            <size-w class="size-w-10" />
            <div class="container-variation-cont-most">
              {val.productVariation.map((valle: any, key: any) => (
                <CardProductVariations1
                  key={key}
                  imgS={imgS}
                  imgP={imgP}
                  dui={valle}
                  slug={props}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

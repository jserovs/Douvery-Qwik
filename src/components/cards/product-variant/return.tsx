import { component$ } from '@builder.io/qwik';

import { CardProductVariations1 } from '~/components/cards/product-variant/card-product-variant';

export default component$(({ valla, imgS, imgP, props }: any) => {
  return (
    <div>
      {valla.variations.map((val: any, key: any) => (
        <div key={key} class="container-variation-product">
          <size-w class="size-w-10" />
          <div class="col-auto">
            <hs-sr1> {val.name} :</hs-sr1>
            <size-w class="size-w-10" />
            <div class="container-variation-cont-most">
              {val.dui.map((valll: any, key: any) => (
                <CardProductVariations1
                  key={key}
                  imgS={imgS}
                  imgP={imgP}
                  dui={valll}
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

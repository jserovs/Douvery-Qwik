import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { UseProductDetailsLink } from '~/services/fuction';

import styles from './product-card-8.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';

import { UsePrice } from '~/components/use/price/price';

export const ContainerCardProduct8 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const discountInMoney = product.price * (product.discount / 100);

  return (
    <div class="product-card">
      <a href={UseProductDetailsLink(product, ref)}>
        {' '}
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt={product.name}
          class="product-image"
        />
      </a>

      <a href={`/v/${product.slug}/${product.dui}`}>
        <h2 class="product-brand">
          <TextCL text={product.marca} />{' '}
        </h2>
      </a>
      <a href={`/v/${product.slug}/${product.dui}`}>
        <h2 class="product-name">
          {' '}
          <TextCL text={product.name} />
        </h2>
      </a>
      <div class="product-discount-porc">
        <p>SAVE</p>
        <p>
          - <UsePrice price={discountInMoney} />
        </p>
      </div>
      <div class="container-prc-info">
        {' '}
        {product.discount > 0 ? (
          <>
            {' '}
            <strong class="hs-sr1 product-price pr-pr">
              <UsePrice price={discoun} />
            </strong>
            <p class="ps-sr1 product-price-discount tach">
              <UsePrice price={product.price} />
            </p>
          </>
        ) : (
          <>
            <strong class="hs-sr1 product-price  pr-pr">
              <UsePrice price={discoun} />
            </strong>
          </>
        )}
      </div>
    </div>
  );
});

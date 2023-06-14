import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-10.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
import { UseProductDetailsLink } from '~/services/fuction';

export const ContainerCardProduct10 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const urlLink = UseProductDetailsLink(product as any );
  return (
    <div class="product-card">
      <a href={urlLink as any}>
        {' '}
        <img
          width={200}
          height={300}
          src={product.images[0]}
          alt={product.name}
          class="product-image"
        />
      </a>
      <a href={urlLink as any}>
        <h2 class="product-brand">
          <TextCL text={product.marca} />{' '}
        </h2>
      </a>
      <a href={urlLink as any}>
        <h2 class="product-name">
          {' '}
          <TextCL text={product.name} />
        </h2>
      </a>
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

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-9.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { UseProductDetailsLink } from '~/services/fuction';

export const ContainerCardProduct9 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  return (
    <div class="product-card">
     <a href={UseProductDetailsLink(product)}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
     <a href={UseProductDetailsLink(product)}>
        <h2 class="product-name">
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
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

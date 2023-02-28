import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-4.css?inline';
import { UsePrice } from '~/components/use/price/price';

export const ContainerCardProduct4 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  return (
    <div class="product-card">
      <a href={`/v/${product.slug}/${product.dui}`}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
      <div class="crt-prc">
        {' '}
        {product.discount > 0 ? (
          <>
            {' '}
            <p class="ps-sr1 product-price tach">
              <UsePrice price={product.price} />
            </p>
            <strong class="hs-sr1 product-price pr-pr">
              <UsePrice price={discoun} />
            </strong>
          </>
        ) : (
          <>
            <strong class="hs-sr1 product-price pr-pr">
              <p class="ps-sr1 et-ps">Price:</p> <UsePrice price={discoun} />
            </strong>
          </>
        )}
      </div>
    </div>
  );
});

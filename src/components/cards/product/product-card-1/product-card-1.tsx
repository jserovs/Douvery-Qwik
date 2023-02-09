import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { Link } from '@builder.io/qwik-city';

export const ContainerCardProduct1 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  return (
    <div class="product-card">
      <img src={product.images[0]} class="product-image" />
      <h2 class="product-name">
        {' '}
        <Link href={`/v/${product.slug}/${product.dui}`}>{product.name}</Link>
      </h2>
      <p-sr1 class="product-brand"> {product.marca}</p-sr1>
      <div class="crt-prc">
        {' '}
        {product.discount > 0 ? (
          <>
            {' '}
            <hs-sr1 class="product-price">
              <UsePrice price={discoun} />
            </hs-sr1>
            <p-sr1 class="product-price tach">
              <UsePrice price={product.price} />
            </p-sr1>
          </>
        ) : (
          <>
            <hs-sr1 class="product-price">
              <UsePrice price={discoun} />
            </hs-sr1>
          </>
        )}
      </div>

      {product.sponsored ? (
        <>
          {' '}
          <div class="product-sponsor">
            <p-sr1>Sponsor</p-sr1>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

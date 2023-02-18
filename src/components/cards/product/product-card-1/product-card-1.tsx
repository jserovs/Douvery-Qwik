import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { DouveryIcon } from '~/components/icons/douvery';
import { Stars } from '~/components/Ratings/stars/stars';

export const ContainerCardProduct1 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  let totalRating = 0.0;
  for (let i = 0; i < product.ratings.length; i++) {
    totalRating = product.ratings[i].rating;
  }
  return (
    <div class="product-card">
      <a href={`/v/${product.slug}/${product.dui}`}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>

      <h2 class="product-name">
        {' '}
        <a href={`/v/${product.slug}/${product.dui}`}>{product.name}</a>
      </h2>
      <p-sr1 class="product-brand">
        {' '}
        <Stars size="16" rating={totalRating} /> {product.marca}
      </p-sr1>

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

      {/* <div class="etq-vrs">
        <DouveryIcon color="#6466e8" /> Verified to Douvery
      </div> */}
      {product.vrfDouvery ? (
        <>
          {' '}
          <et-sr2>
            <DouveryIcon color="#FFF" /> Verified to Douvery
          </et-sr2>
        </>
      ) : (
        <></>
      )}
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

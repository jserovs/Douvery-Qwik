import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-3.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { Stars } from '~/components/Ratings/stars/stars';
import { DouveryIcon } from '~/components/icons/douvery';
import { UseProductDetailsLink } from '~/services/fuction';

export const ContainerCardProduct3 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  let totalRating = 0.0;
  for (let i = 0; i < product.ratings.length; i++) {
    totalRating = product.ratings[i].rating;
  }
  return (
    <div class="product-card">
     <a href={UseProductDetailsLink(product)}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
     <a href={UseProductDetailsLink(product)}>
        <h2 class="product-name" title={product.name}>
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
        </h2>
        <div class="crt-prc">
          {' '}
          {product.discount > 0 ? (
            <>
              {' '}
              <strong class="hs-sr1 product-price pr-pr">
                <UsePrice price={discoun} />
              </strong>
              <p class="ps-sr1 product-price tach">
                <UsePrice price={product.price} />
              </p>
            </>
          ) : (
            <>
              <strong class="hs-sr1 product-price pr-pr">
                <p class="ps-sr1 et-ps">Price:</p> <UsePrice price={discoun} />
              </strong>
            </>
          )}
        </div>
      </a>{' '}
      <div class="ctr-stars">
        <div class="stars">
          <Stars size="16" rating={totalRating} /> ({totalRating}){' '}
        </div>
        <div class=" product-brand"> {product.marca}</div>
      </div>
      <div class="ETQ-">
        {' '}
        {product.vrfDouvery ? (
          <>
            {' '}
            <div class="etq-vrs">
              <DouveryIcon color="#6466e8" /> Verified to Douvery
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
      {product.sponsored ? (
        <>
          {' '}
          <div class="product-sponsor">
            <p class="ps-sr1">Sponsor</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-2.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { UseProductDetailsLink } from '~/services/fuction';
import { UseStarRatingNoHover } from '~/components/use/ratings/UseStarRatingNoHover/UseStarRatingNoHover';

export const ContainerCardProduct2 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

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
      <a href={UseProductDetailsLink(product, ref)}>
        <h2 class="product-name">
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
        </h2>
      </a>
      <div class="container-ratings">
        <UseStarRatingNoHover product={product} size={18} />
      </div>

      <div class=" product-brand"> {product.marca}</div>

      <div class="crt-prc">
        {' '}
        {product.discount > 0 ? (
          <>
            {' '}
            <strong class="hs-sr1 product-price">
              <UsePrice price={discoun} />
            </strong>
            <p class="ps-sr1  tach product-price-discount">
              <UsePrice price={product.price} />
            </p>
          </>
        ) : (
          <>
            <strong class="hs-sr1 product-price">
              <UsePrice price={discoun} />
            </strong>
          </>
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

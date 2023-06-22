import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { DouveryIcon } from '~/components/icons/douvery';
import { UseProductDetailsLink } from '~/services/fuction';

import { TextCL } from '~/components/use/textCL/textCL';
import { UseStarsRatingNoHover } from '~/components/use/ratings/useRatingNoHover/useRatingNoHover';

export const ContainerCardProduct1 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  return (
    <div class="product-card">
      <a href={UseProductDetailsLink(product, ref)}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
      <h2 class="product-name">
        {' '}
        <a href={UseProductDetailsLink(product, ref)}>
          <TextCL text={product.name} />
        </a>
      </h2>
      <UseStarsRatingNoHover rating={product.rating} count={product.count} />
      <div class=" product-brand"> {product.marca}</div>
      <div class="crt-prc">
        {' '}
        {product.discount > 0 ? (
          <>
            {' '}
            <strong class="hs-sr1 product-price">
              <UsePrice price={discoun} />
            </strong>
            <p class="ps-sr1 product-price tach">
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
            <p class="ps-sr1">Sponsor</p>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
});

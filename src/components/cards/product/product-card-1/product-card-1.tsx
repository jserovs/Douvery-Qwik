import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { DouveryIcon } from '~/components/icons/douvery';
import { Stars } from '~/components/Ratings/stars/stars';
import { ContainerProgres } from '~/components/progres-bar/container-progres/container-progres';

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
      <div class="ctr-stars">
        <Stars size="16" rating={totalRating} /> ({totalRating}){' '}
        {product.ratings.length}
        <div class="ctr-progr">
          <div class="tolst-tip"></div>
          <div class="pr-ttle">
            <p class="hs-sr1">Ratings</p>
          </div>
          <ContainerProgres props={product} />
          <div class="pr-qtyon">
            <p class="ps-sr1">Sin preguntas Respondidas</p>
          </div>
        </div>
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

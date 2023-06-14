import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-5.css?inline';
import { UsePrice } from '~/components/use/price/price';

import { Stars } from '~/components/Ratings/stars/stars';

import { DouveryCheckMark } from '~/components/icons/checkMark';

export const ContainerCardProduct5 = component$(({ product }: any) => {
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
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt={product.name}
          class="product-image"
        />
      </a>
      <a href={`/v/${product.slug}/${product.dui}`}>
        <h2 class="product-name">
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
        </h2>
      </a>
      <div class="sto-s">
        {product.quantity <= 1 ? (
          <>
            <div class="ctr-out-of-Stocks">
              <div class="no-stock"></div> Articulo agotado
            </div>
          </>
        ) : product.quantity <= 12 ? (
          <div class="stock-lst">
            {' '}
            <div class="ctr-stock">
              <DouveryCheckMark size="16px" />
              <p>Disponible</p>
            </div>
            <div class="minus-dolceid-alert-buty">
              ¡Solo Queda(n) {product.quantity} unidades!
            </div>
          </div>
        ) : (
          <>
            <div class="ctr-stock">
              <DouveryCheckMark size="16px" />
              <p>Disponible</p>
            </div>
          </>
        )}{' '}
      </div>
      <div class="ctr-stars">
        <Stars size="16" rating={totalRating} /> ({totalRating}){' '}
        <div class="tex-str"> de {product.ratings.length} Review(s)</div>
      </div>

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
            <strong class="hs-sr1 product-price  pr-pr">
              <UsePrice price={discoun} />
            </strong>
          </>
        )}
      </div>
    </div>
  );
});

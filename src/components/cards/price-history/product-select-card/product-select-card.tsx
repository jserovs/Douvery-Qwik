import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';
import styles from './product-select-card.css?inline';
import { UsePrice } from '~/components/use/price/price';
import { UseStarRating } from '~/components/use/ratings/useRatingHover/useRatingHover';
import { LabelSaveRed } from '~/components/use/label/labelSaveRed';
import { TextCL } from '~/components/use/textCL/textCL';
import { UseNumberOneCategory } from '~/components/use/numberOne/numberOneCategory';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { UseProductDetailsLink } from '~/services/fuction';
import { AddCart } from '~/components/(Product-details)/components/container-button-details';

// import { ButtonCardHover } from '~/components/use/bropdown-button-cart-fast-pay/button-card/button-card-hover';
export const CardProductSelect1 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  const isLoader = useSignal(false);
  return (
    <div class="container-all">
      <div class="card">
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt="Product Image"
          class="product-image"
        />
        <div class="product-info">
          <a href={UseProductDetailsLink(product, ref)}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>
          <p class="product-description">{product.marca}</p>
          <UseNumberOneCategory product={product} />
          <div class="container-ratings">
            <UseStarRating product={product} />
          </div>
          {product.discount < 20 ? '' : <LabelSaveRed product={product} />}
          {product.price > 998 ? (
            <div class="ctr-free-shipping">
              <p>
                <DouveryCheckMark size="15px" /> Disponible
              </p>
              <div class="ctr-opa">|</div>
              <p>
                {' '}
                <DouveryCheckMark size="15px" />
                Free shipping
              </p>
            </div>
          ) : (
            ''
          )}

          <div class="product-price">
            {product.discount > 0 ? (
              <>
                {' '}
                <UsePrice price={discoun} />
                <div class="ctr-opa">|</div>
                <div class="price-t  tach">
                  {' '}
                  <UsePrice price={product.price} />
                </div>
              </>
            ) : (
              <>
                <UsePrice price={product.price} />
              </>
            )}{' '}
          </div>
        </div>

        {/* <div class="container-hover-button">
          {' '}
          <ButtonCardHover product={product} />
        </div> */}
      </div>
      <div class="container-buttons">
        <button
          id="button-add-STORE"
          class="buttonCart"
          onClick$={() => AddCart({ product, quantity: 1, isLoader })}
        >
          {isLoader.value == true && (
            <div class="check">
              {' '}
              <DouveryCheckMark size="15px" />
            </div>
          )}{' '}
          Add to cart
        </button>
        <button class="buttonPay">Fast pay</button>
      </div>
    </div>
  );
});

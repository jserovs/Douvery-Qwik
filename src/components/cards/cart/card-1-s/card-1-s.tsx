import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-1-s.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
import { DouveryCheckMark } from '~/components/icons/checkMark';
export const Card1SCART = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  return (
    <div class="container-all">
      <div class="card">
        <img src={product.images} alt="Product Image" class="product-image" />
        <div class="product-info">
          <a href={`/v/${product.slug}/${product.dui}`}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>{' '}
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
            <div class="ctr-free-shipping">
              <p>
                <DouveryCheckMark size="15px" /> Disponible
              </p>
            </div>
          )}
          {product.realQuantity >= 5 ? (
            <></>
          ) : (
            <div class="alert-art">
              <p>¡Queda(n) muy pocos , 5 o menos!</p>
            </div>
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
          <div class="gift-option">
            <input type="checkbox" id="gift-checkbox" name="gift-checkbox" />
            <label for="gift-checkbox">
              Seleccione esta casilla si el artículo es un regalo.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
});

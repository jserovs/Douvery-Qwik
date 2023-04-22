import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './purchase-products.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { UsePrice } from '~/components/use/price/price';

export const Card1PurchaseProductOrders = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  return (
    <div class="container-all">
      <div class="card">
        <img src={product.image} alt="Product Image" class="product-image" />
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
      </div>
    </div>
  );
});

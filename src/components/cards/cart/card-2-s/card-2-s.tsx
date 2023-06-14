import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-2-s.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
import { UseProductDetailsLink } from '~/services/fuction';

export const Card2SCART = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
 
  return (
    <div class="container-all">
      <div class="card">
        <img src={product.images} alt="Product Image" class="product-image" />
        <div class="product-info">
         <a href={UseProductDetailsLink(product)}>
            {' '}
            <h2 class="product-title">
              <TextCL text={product.name} />{' '}
            </h2>
          </a>{' '}
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

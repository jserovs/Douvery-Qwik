import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-1.css?inline';
import { UsePrice } from '~/components/use/price/price';

export const ContainerCardProduct1 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  return (
    <div class="crtr-prds-card">
      <div class="crtrt-s">
        {' '}
        <div class="crt-img">
          {product && product.images && product.images.length > 0 ? (
            <img src={product.images[0]} alt="" />
          ) : (
            <div>No image available</div>
          )}
        </div>
      </div>
      <div class="crt-title">
        <p-sr1>
          <div class="sr"> {product.name}</div>
          <div class="dsr">
            {' '}
            <hs-sr1> {product.marca}</hs-sr1>
          </div>
        </p-sr1>
      </div>
      <div class="crt-price">
        <hs-sr1 class="pr-n-ta">
          <UsePrice price={discoun} />
        </hs-sr1>
        <p class="pr-ta">
          <UsePrice price={product.price} />
        </p>
      </div>
      {product.shippingFree === true ? (
        <>
          {' '}
          <div class="fllr-res">
            {' '}
            <f-srt1>Envio Gratis</f-srt1>
          </div>{' '}
        </>
      ) : (
        <> </>
      )}
    </div>
  );
});

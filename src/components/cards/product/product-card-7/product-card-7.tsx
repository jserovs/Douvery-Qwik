import { component$, useSignal, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-7.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';

import { AddCart } from '~/components/(Product-details)/components/container-button-details';
import { DouveryCheckMark } from '~/components/icons/checkMark';
import { ModalCartInfo } from '~/components/modal/modal-cart/modal-cart';
import { UsePrice } from '~/components/use/price/price';
import { UseProductDetailsLink } from '~/services/fuction';

export const ContainerCardProduct7 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);

  const isLoader = useSignal(false);

  return (
    <div class="product-card">
      <a href={UseProductDetailsLink(product, ref)}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
      <a href={UseProductDetailsLink(product, ref)}>
        <h2 class="product-brand">
          <TextCL text={product.marca} />{' '}
        </h2>
      </a>
      <a href={UseProductDetailsLink(product, ref)}>
        <h2 class="product-name">
          {' '}
          <TextCL text={product.name} />
        </h2>
      </a>
      <div class="container-prc-info">
        {' '}
        {product.discount > 0 ? (
          <>
            {' '}
            <strong class="hs-sr1 product-price pr-pr">
              <UsePrice price={discoun} />
            </strong>
            <p class="ps-sr1 product-price-discount tach">
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

      {isLoader.value == true && <ModalCartInfo />}
      <div class="container-buttons">
        <button
          id="button-add-STORE"
          class="button-add-STORE"
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
        <button class="button-quick-view">Quick view</button>
      </div>
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-10.css?inline';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';

export const ContainerCardProduct10 = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discoun = product.price - product.price * (product.discount / 100);
  const urlLink = `/v/${product.slug}/${product.dui}/?ss_v=A591A6D40BF420404A011733CFB7B190D62C65BF0BCDA32B57B277D9AD9F146E`;
  return (
    <div class="product-card">
      <a href={urlLink}>
        {' '}
        <img
          width={200}
          height={300}
          src={product.images[0]}
          alt={product.name}
          class="product-image"
        />
      </a>
      <a href={urlLink}>
        <h2 class="product-brand">
          <TextCL text={product.marca} />{' '}
        </h2>
      </a>
      <a href={urlLink}>
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
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-11.css?inline';
import { UseProductDetailsLink } from '~/services/fuction';

export const ContainerCardProduct11 = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);
  const urlLink = UseProductDetailsLink(product, ref);
  return (
    <div class="product-card">
      <a href={urlLink}>
        {' '}
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt={product.name}
          class="product-image"
        />
      </a>
    </div>
  );
});

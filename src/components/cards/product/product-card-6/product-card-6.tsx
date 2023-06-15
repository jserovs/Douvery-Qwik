import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-6.css?inline';
import { UseProductDetailsLink } from '~/services/fuction';

export const ContainerCardProduct6 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="product-card">
      <a href={UseProductDetailsLink(product)}
      >
        {' '}
        <img
          width={200}
          height={200}
          src={product.images[0]}
          alt={product.name}
          class="product-image"
        />
      </a>
     <a href={UseProductDetailsLink(product)}
      >
        <h2 class="product-name">
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
        </h2>
      </a>
    </div>
  );
});

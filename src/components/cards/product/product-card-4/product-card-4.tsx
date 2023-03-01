import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-4.css?inline';

export const ContainerCardProduct4 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="product-card">
      <a href={`/v/${product.slug}/${product.dui}`}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-6.css?inline';

export const ContainerCardProduct6 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="product-card">
      <a href={`/v/${product.slug}/${product.dui}`}>
        {' '}
        <img src={product.images[0]} alt={product.name} class="product-image" />
      </a>
      <a href={`/v/${product.slug}/${product.dui}`}>
        <h2 class="product-name">
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
        </h2>
      </a>
    </div>
  );
});

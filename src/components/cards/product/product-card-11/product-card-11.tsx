import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-11.css?inline';

export const ContainerCardProduct11 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="product-card">
      <a href={`/v/${product.slug}/${product.dui}`}>
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

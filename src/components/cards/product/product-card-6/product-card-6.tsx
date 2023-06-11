import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-6.css?inline';

export const ContainerCardProduct6 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="product-card">
      <a
        href={`/v/${product.slug}/${product.dui}?ss_v=A5B7FA5814DC8F44C4105D46F2835AD9F3F6FC7BD5893405A92F546D2079395F`}
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
      <a
        href={`/v/${product.slug}/${product.dui}?ss_v=A5B7FA5814DC8F44C4105D46F2835AD9F3F6FC7BD5893405A92F546D2079395F`}
      >
        <h2 class="product-name">
          {' '}
          {product.name[0].toUpperCase() + product.name.substring(1)}
        </h2>
      </a>
    </div>
  );
});

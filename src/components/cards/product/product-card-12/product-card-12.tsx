import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './product-card-12.css?inline';

export const ContainerCardProduct12 = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="card">
      <img
        src={product.images[0]}
        alt={product.name}
        class="product-image"
        width="300"
        height="300"
      />
    </div>
  );
});

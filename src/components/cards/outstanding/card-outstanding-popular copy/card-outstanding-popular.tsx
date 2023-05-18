import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-popular.css?inline';
export const CardOutstandingPopular = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="product-card">
      <a href={`/v/${productPopular.slug}/${productPopular.dui}`}>
        {' '}
        <img
          src={productPopular.images[0]}
          alt={productPopular.name}
          class="product-image"
        />
      </a>
    </div>
  );
});

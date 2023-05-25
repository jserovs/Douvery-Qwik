import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-recets.css?inline';

export const CardOutstandingRecents = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="category-card">
      <div class="container-a">
        <div class="category-info">
          <h1>Mas reciente en Douvery</h1>
        </div>

        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
      <a
        href={'/v/' + productPopular.slug + '/' + productPopular.dui}
        aria-label={productPopular.slug}
      >
        <div class="image-container">
          <img
            src={productPopular.images[0]}
            alt={productPopular.name + 'img product'}
          />
        </div>
      </a>
    </div>
  );
});

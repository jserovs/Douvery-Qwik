import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-recets.css?inline';
export const CardOutstandingRecents = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="category-card">
      <div class="category-info">
        <h1>Mas reciente</h1>
      </div>

      <div class="image-container">
        <img src={productPopular.images[0]} />
      </div>
      <div class="show-more">
        <a href={`/s-categorie//`}> Ver todos</a>
      </div>
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-popular.css?inline';
export const CardOutstandingPopular = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="category-card">
      <div class="category-info">
        <h1>{productPopular.name}</h1>
      </div>

      <div class="category-img">
        <img src={productPopular.images[0]} />
      </div>
      <div class="show-more">
        <a href={`/s-categorie//`}> Ver todos</a>
      </div>
    </div>
  );
});

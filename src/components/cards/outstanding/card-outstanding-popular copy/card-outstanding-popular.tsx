import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-popular.css?inline';
import { UseStarRating } from '~/components/use/ratings/useRatingHover/useRatingHover';
export const CardOutstandingPopular = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  return (
    <div class="category-card">
      <div class="container-a">
        <div class="category-info">
          <h1>Mas popular en ratings</h1>
        </div>
        <UseStarRating product={productPopular} />
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>

      <div class="image-container">
        <img src={productPopular.images[0]} />
      </div>
    </div>
  );
});

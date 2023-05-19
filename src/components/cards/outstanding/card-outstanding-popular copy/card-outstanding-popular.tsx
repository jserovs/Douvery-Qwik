import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-popular.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { useNavigate } from '@builder.io/qwik-city';
export const CardOutstandingPopular = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  const nav = useNavigate();
  return (
    <div class="category-card">
      <div class="container-a">
        <div class="category-info">
          <h1>Mas popular en ratings</h1>
        </div>

        <div class="container-stars">
          <Stars rating={productPopular.ratingInfo.rating} />
          <p>
            ({productPopular.ratingInfo.rating})
            {productPopular.ratingInfo.count}
          </p>
        </div>
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>

      <div
        class="image-container"
        onClick$={() =>
          nav('/v/' + productPopular.slug + '/' + productPopular.dui, true)
        }
      >
        <img src={productPopular.images[0]} />
      </div>
    </div>
  );
});

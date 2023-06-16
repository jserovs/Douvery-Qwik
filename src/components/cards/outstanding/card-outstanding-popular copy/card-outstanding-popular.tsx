import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-popular.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { truncarDecimales } from '~/services/fuction';

export const CardOutstandingPopular = component$(({ productPopular }: any) => {
  useStylesScoped$(styles);
  const rate = truncarDecimales(productPopular.ratingInfo.rating, 1);
  return (
    <div class="category-card">
      <div class="container-a">
        <div class="category-info">
          <h1>Mas popular en ratings</h1>
        </div>

        <div class="container-stars">
          <Stars rating={productPopular.ratingInfo.rating} />
          <p>
            ({rate}){productPopular.ratingInfo.count}
          </p>
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
            width={200}
            height={200}
            src={productPopular.images[0]}
            alt={productPopular.name + 'img product'}
          />
        </div>
      </a>
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './useRatingHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { ContainerProgres } from '~/components/progres-bar/container-progres/container-progres';
export const UseStarRating = component$(({ product, color, size }: any) => {
  useStylesScoped$(styles);
  let totalRating = 0.0;
  for (let i = 0; i < product.ratings.length; i++) {
    totalRating = product.ratings[i].rating;
  }
  return (
    <div class="container-all">
      <div class="ctr-stars">
        <Stars size={size} color={color} rating={totalRating} />{' '}
        <div class="ctr-progr">
          <div class="tolst-tip"></div>
          <div class="pr-ttle">
            <p class="hs-sr1">Ratings</p>
          </div>
          <ContainerProgres props={product} />
          <div class="pr-qtyon">
            <p class="ps-sr1">Sin preguntas Respondidas</p>
          </div>
        </div>
      </div>
      <div class="ct-ratig">
        ({totalRating}) {product.ratings.length}
      </div>
    </div>
  );
});

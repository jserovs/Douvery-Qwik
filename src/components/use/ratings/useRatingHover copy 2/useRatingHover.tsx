import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './useRatingHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';

export const UseStarRating = component$(
  ({ rating, count, color, size }: any) => {
    useStylesScoped$(styles);

    return (
      <div class="container-all">
        <div class="ctr-stars">
          <Stars size={size} color={color} rating={rating} />{' '}
          <div class="ctr-progr">
            <div class="tolst-tip"></div>
            <div class="pr-ttle">
              <p class="hs-sr1">Ratings</p>
            </div>

            <div class="pr-qtyon">
              <p class="ps-sr1">Sin preguntas Respondidas</p>
            </div>
          </div>
        </div>
        <div class="ct-ratig">
          ({rating}) {count}
        </div>
      </div>
    );
  }
);

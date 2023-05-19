import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './useRatingNoHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';

export const UseStarsRatingNoHover = component$(
  ({ rating, count, color, size }: any) => {
    useStylesScoped$(styles);

    return (
      <div class="container-all">
        <div class="ctr-stars">
          <Stars size={size} color={color} rating={rating} />{' '}
        </div>
        <div class="ct-ratig">
          ({rating}) {count}
        </div>
      </div>
    );
  }
);

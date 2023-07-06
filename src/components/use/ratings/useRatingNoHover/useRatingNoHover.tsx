import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './useRatingNoHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { truncarDecimales } from '~/services/fuction';

export const UseStarsRatingNoHover = component$(
  ({ rating, count, color, size }: any) => {
    useStylesScoped$(styles);
    const rate = truncarDecimales(rating, 1);
    return (
      <div class="container-all">
        <div class="ctr-stars">
          <Stars size={size} color={color} rating={rate} />{' '}
        </div>
        <div class="ct-ratig">
          ({rate}) {count}
        </div>
      </div>
    );
  }
);

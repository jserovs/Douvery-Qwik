import {
  component$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './useRatingHover.css?inline';
import { Stars } from '~/components/Ratings/stars/stars';
import { ContainerProgres } from '~/components/progres-bar/container-progres/container-progres';
import { fetchProductRatings } from '~/services/reviews/rating/rating';
import { truncarDecimales } from '~/services/fuction';
interface Rating {
  rating: number;
  count: number;
}
export const UseStarRating = component$(({ product, color, size }: any) => {
  useStylesScoped$(styles);

  const rating = useStore<Rating>({
    rating: 0,
    count: 0,
  });
  useTask$(async () => {
    const response = await fetchProductRatings(product.dui);
    rating.rating = response.rating as any;
    rating.count = response.count as any;
  });
  const rate = truncarDecimales(rating.rating, 1);
  return (
    <div class="container-all">
      <div class="ctr-stars">
        <Stars size={size} color={color} rating={rating.rating} />{' '}
        <div class="ctr-progr">
          <div class="tolst-tip"></div>
          <div class="pr-ttle">
            <p class="hs-sr1">Ratings</p>
          </div>
          <ContainerProgres product={product} />
          <div class="pr-qtyon">
            <p class="ps-sr1">Sin preguntas Respondidas</p>
          </div>
        </div>
      </div>
      <div class="ct-ratig">
        ({rate}) {rating.count}
      </div>
    </div>
  );
});

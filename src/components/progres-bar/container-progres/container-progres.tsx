import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
// import { ProgressBar } from '../progres-bar';
import styles from './container-progres.css?inline';
import { fetchProductRatingsCounts } from '~/services/reviews/rating/rating';
import { ProgressBar } from '../progres-bar';
export const ContainerProgres = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const ratingCounts = useSignal({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  useTask$(async () => {
    const response = await fetchProductRatingsCounts(product.dui);
    ratingCounts.value = response.ratingCounts as any;
  });
  const totalRatings = Object.values(ratingCounts.value).reduce(
    (a, b) => a + b,
    0
  );

  const bars = [];
  for (const [rating, count] of Object.entries(ratingCounts.value)) {
    const percentage = (count / totalRatings) * 100;
    bars.push({ rating, count, percentage });
  }
  return (
    <div class="ctr-ratings-progress">
      <div class="star-ratings">
        <div class="star-ratings">
          {bars.map((bar, i) => (
            <div class="star-ratings" key={i}>
              <ProgressBar
                rating={bar.rating}
                count={bar.count}
                porce={Math.min(100, Math.max(0, bar.percentage))}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

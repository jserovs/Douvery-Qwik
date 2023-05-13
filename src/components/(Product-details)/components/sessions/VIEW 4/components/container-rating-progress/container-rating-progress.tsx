import {
  component$,
  useSignal,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import styles from './container-rating-progress.css?inline';

import { OneStar } from '~/components/Ratings/oneStars/oneStars';
import { ProgressBar } from '~/components/progres-bar/progres-bar';
import { fetchProductRatingsCounts } from '~/services/reviews/rating/rating';

export const ContaineProductReviewsRatingProgress = component$(
  ({ product }: any) => {
    useStylesScoped$(styles);
    const totalRat = useSignal(0);
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
      <div>
        <hs-sr2>Ratings progress</hs-sr2>
        <div class="ctr-ratings-bs">
          <div class="crrtr-srtrt">
            <div class="ctr-ratings-total">
              <div class="ctr-stars">
                <p-sr3>{totalRat.value}</p-sr3>{' '}
                <OneStar color="#008080" rating={1} size="25" />
              </div>
              <div class="ctr-total">
                <p class="ps-sr1"> {totalRatings} ratings</p>
              </div>
            </div>
          </div>
          <div class="ctr-ratings-progress">
            <div class="star-ratings">
              <div class="star-ratings">
                {bars.map((bar, i: number) => (
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
        </div>
      </div>
    );
  }
);

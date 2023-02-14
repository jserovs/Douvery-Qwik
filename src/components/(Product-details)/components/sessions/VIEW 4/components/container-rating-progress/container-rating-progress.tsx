import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-rating-progress.css?inline';

import { OneStar } from '~/components/Ratings/oneStars/oneStars';
import { ProgressBar } from '~/components/progres-bar/progres-bar';

export const ContaineRatingProgress = component$(({ props }: any) => {
  useStylesScoped$(styles);
  const ratingCounts = new Map<number, number>([
    [5, 0],
    [4, 0],
    [3, 0],
    [2, 0],
    [1, 0],
  ]);

  for (const rating of props.ratings) {
    const currentCount = ratingCounts.get(rating.rating) || 0;
    ratingCounts.set(rating.rating, currentCount + 1);
  }

  const totalRatings = [...ratingCounts.values()].reduce((a, b) => a + b, 0);

  const bars = [];
  for (const [rating, count] of ratingCounts) {
    const percentage = (count / totalRatings) * 100;
    bars.push({ rating, count, percentage });
  }

  let ratingsProd = 0.0;
  for (let i = 0; i < props.ratings.length; i++) {
    ratingsProd = props.ratings[i].rating;
  }

  return (
    <div>
      <hs-sr2>Ratings progress</hs-sr2>
      <div class="ctr-ratings-bs">
        <div class="crrtr-srtrt">
          <div class="ctr-ratings-total">
            <div class="ctr-stars">
              <p-sr3>{ratingsProd}</p-sr3>{' '}
              <OneStar color="#008080" rating={1} size="25" />
            </div>
            <div class="ctr-total">
              <p-sr1> {totalRatings} ratings</p-sr1>
            </div>
          </div>
        </div>
        <div class="ctr-ratings-progress">
          <div class="star-ratings">
            <div class="star-ratings">
              {bars.map((bar) => (
                <div class="star-ratings">
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
});

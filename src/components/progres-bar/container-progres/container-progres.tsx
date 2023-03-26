import { component$, useStylesScoped$ } from '@builder.io/qwik';
import { ProgressBar } from '../progres-bar';
import styles from './container-progres.css?inline';
export const ContainerProgres = component$(({ props }: any) => {
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

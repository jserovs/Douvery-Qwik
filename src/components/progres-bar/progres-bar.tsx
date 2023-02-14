import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './progres-bar.css?inline';
import { OneStar } from '../Ratings/oneStars/oneStars';

export const ProgressBar = component$(({ count, rating, porce }: any) => {
  useStylesScoped$(styles);
  let width = 0;
  if (!isNaN(porce)) {
    width = porce;
  }
  return (
    <div class="ctr-st">
      {' '}
      <div class="ctr-stars-qty">
        <p-sr2> {rating}</p-sr2>
        <OneStar color="#008080" rating={1} />
      </div>
      <div class="progress-bar">
        {' '}
        <div class="progress-bar-fill" style={{ width: `${width}%` }} />
      </div>
      <p-sr2> {count}</p-sr2>
    </div>
  );
});

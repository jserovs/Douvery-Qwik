import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './progres-bar.css?inline';
import { OneStar } from '../Ratings/oneStars/oneStars';

export const ProgressBar = component$(({ porce }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="ctr-st">
      {' '}
      <OneStar rating={1} />
      <div class="progress-bar">
        {' '}
        <div class="progress-bar-fill" style={{ width: `${porce}%` }} />
      </div>
    </div>
  );
});

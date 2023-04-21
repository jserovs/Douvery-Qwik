import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './line.css?inline';

export const ProgressLine = component$(({ count }: any) => {
  useStylesScoped$(styles);
  const steps = 5;
  const stepWidth = (100 / (steps - 1)) * count;
  return (
    <div class="ctr-st">
      <div class="progress-bar">
        <div class="progress-bar-fill" style={{ width: `${stepWidth}%` }} />
      </div>
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './index.css?inline';
export const UseNumberOneCategory = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <>
      {product.isBestInCategory ? (
        <div class="ctr-1">
          {' '}
          <div class="top-1">#1 De </div>
          <p> {product.category}</p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
});

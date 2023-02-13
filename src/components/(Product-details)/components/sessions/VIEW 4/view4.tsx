import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './view4.css?inline';
import { ContaineRatingProgress } from './components/container-rating-progress/container-rating-progress';
export const View4 = component$(({ product }: any) => {
  product;
  useStylesScoped$(styles);
  return (
    <div class="ctnr-view-4">
      {' '}
      <div class="viewleft">
        <ContaineRatingProgress props={product} />
      </div>
      <div class="viewrigth"></div>
    </div>
  );
});

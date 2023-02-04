import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-by-seller.css?inline';

export const ContainerCombinedBySeller = component$(() => {
  useStylesScoped$(styles);
  return <div class="crrts-csrtos"></div>;
});

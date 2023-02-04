import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-by-douvery.css?inline';

export const ContainerCombinedByDouvery = component$(({ props }: any) => {
  useStylesScoped$(styles);
  return <div>{props}</div>;
});

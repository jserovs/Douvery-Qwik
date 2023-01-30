import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './css/container-vertical-info-product.css?inline';
export const ContainerVertInfo = component$(() => {
  useStylesScoped$(styles);
  return <div class="crrtr-vert-csrtre"></div>;
});

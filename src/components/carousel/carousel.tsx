import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class="carousel"></div>
    </>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './carousel-all.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class="carousel">
        <div class="carousel__container"> </div>
      </div>
    </>
  );
});

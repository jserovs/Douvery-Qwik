import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-gift-1.css?inline';
export const CardGift1 = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class=" c-vrt-usr">
      <div class="image-container">
        <img
          src="https://res.cloudinary.com/douvery/image/upload/v1684370137/j2dfuyjvwjbzitxd4ttn.gif"
          alt=""
        />
      </div>
      <div class="show-more">
        <a href={`/s-categorie//`}> Ver todos</a>
      </div>
    </div>
  );
});

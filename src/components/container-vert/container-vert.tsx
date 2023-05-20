import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-vert.css?inline';
export default component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class=" c-vrt-usr">
        <div class="category-info">
          <h1>Ofertas a tiempo limitado</h1>
        </div>
        <div class="image-container">
          <img
            width={250}
            height={180}
            src="https://res.cloudinary.com/douvery/image/upload/v1684409489/fzirjr9kwhkrcxb1iubv.avif"
            alt=""
          />
        </div>
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
    </>
  );
});

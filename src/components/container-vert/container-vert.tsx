import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-vert.css?inline';

export default component$(({ title, image }: any) => {
  useStylesScoped$(styles);
  return (
    <>
      <div class=" c-vrt-usr">
        <div class="category-info">
          <h1>{title}</h1>
        </div>
        <div class="image-container">
          <img width={262} height={195} src={image} alt="imagen de oferta" />
        </div>
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
    </>
  );
});

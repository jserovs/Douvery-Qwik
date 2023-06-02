import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-vert.css?inline';
import { Image } from '@unpic/qwik';

export default component$(({ title, image }: any) => {
  useStylesScoped$(styles);
  return (
    <>
      <div class=" c-vrt-usr">
        <div class="category-info">
          <h1>{title}</h1>
        </div>
        <div class="image-container">
          <Image
            src={image}
            layout="constrained"
            width={262}
            height={195}
            alt="imagen de oferta"
            style={{ borderRadius: '5px' }}
          />
        </div>
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
    </>
  );
});

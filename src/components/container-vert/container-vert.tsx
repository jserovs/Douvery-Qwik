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
            src="https://images.unsplash.com/photo-1595516239376-c777c32a72a4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80"
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

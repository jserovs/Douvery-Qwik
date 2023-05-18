import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './messaje-dvert-1.css?inline';
export const MessajeDvert1 = component$(() => {
  useStylesScoped$(styles);
  return (
    <div class="card">
      <div class="container">
        <div class="emoji">😄🎉</div>
        <div class="text">
          Aquí comprar es tan sencillo como contar 1, 2, 3. Nos hemos esforzado
          para hacer de tu experiencia de compra algo realmente fácil y
          agradable.
        </div>
      </div>
    </div>
  );
});

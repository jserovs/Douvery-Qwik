import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-buttton-combined.css?inline';

export const ContainerButtonCombined = component$(() => {
  useStylesScoped$(styles);
  return (
    <div>
      <button class="buttonCombined">Agregar al carrito</button>
    </div>
  );
});

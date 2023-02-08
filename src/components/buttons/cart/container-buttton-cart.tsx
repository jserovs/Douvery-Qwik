import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-buttton-cart.css?inline';

export const ContainerButtonCart = component$(() => {
  useStylesScoped$(styles);
  return (
    <div>
      <button class="buttonCart">Agregar al carrito</button>
    </div>
  );
});

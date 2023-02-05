import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './container-buttton-cart.css?inline';
import { DouveryCart } from '~/components/icons/cart';
export const ContainerButtonCart = component$(() => {
  useStylesScoped$(styles);
  return (
    <div>
      <button class="buttonCart">
        <DouveryCart size="20px" /> Añadir al carrito
      </button>
    </div>
  );
});

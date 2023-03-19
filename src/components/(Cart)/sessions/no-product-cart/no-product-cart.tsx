import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './no-product-cart.css?inline';
export const NoProductCart = component$(() => {
  useStylesScoped$(styles);
  return (
    <>
      <div class="container">
        <h1 class="title">Tu carrito está vacío</h1>

        <p class="description">
          Descubre nuestras increíbles ofertas y productos.
        </p>
        <a href="productos.html" class="cta">
          Explorar productos
        </a>
      </div>
    </>
  );
});

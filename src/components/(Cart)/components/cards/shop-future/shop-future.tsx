import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './shop-future.css?inline';

export const CardShopFuture = component$(
  () => {
    useStylesScoped$(styles);
    return (
      <>
        <div class="cart-future-shop">
          <h3 class="container-titulo">Lista de compras futuras
</h3>
          <ul class="container-lista">
          </ul>
        </div>
      </>
    );
  }
);

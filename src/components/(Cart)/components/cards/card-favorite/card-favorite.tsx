import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-favorite.css?inline';

export const CardFavoriteProduct = component$(
  () => {
    useStylesScoped$(styles);
    return (
      <>
        <div class="cart-future-shop">
          <h3 class="container-titulo">Marcados como favoritos
</h3>
          <ul class="container-lista">
          </ul>
        </div>
      </>
    );
  }
);

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './product-img-only.css?inline';

export const CtnrCardImageOnly = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="container">
      <div class="card">
        <img src={product.images[0]} alt="Image" />
        <div class="nfo">
          <h3>${product.price}.00</h3>
        </div>
      </div>
    </div>
  );
});

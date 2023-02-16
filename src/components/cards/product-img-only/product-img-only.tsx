import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './product-img-only.css?inline';

export const CtnrCardImageOnly = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="container">
      <div class="card">
        <a href={`/v/${product.slug}/${product.dui}`}>
          <img src={product.images[0]} alt="Image" />
        </a>

        <div class="nfo">
          <hs-sr1>${product.price}.00</hs-sr1>
        </div>
      </div>
    </div>
  );
});

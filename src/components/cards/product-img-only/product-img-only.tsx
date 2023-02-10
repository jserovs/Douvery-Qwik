import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './product-img-only.css?inline';
import { Link } from '@builder.io/qwik-city';

export const CtnrCardImageOnly = component$(({ product }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="container">
      <div class="card">
        <Link href={`/v/${product.slug}/${product.dui}`}>
          <img src={product.images[0]} alt="Image" />
        </Link>

        <div class="nfo">
          <h3>${product.price}.00</h3>
        </div>
      </div>
    </div>
  );
});

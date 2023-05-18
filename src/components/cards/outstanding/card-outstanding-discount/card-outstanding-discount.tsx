import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-discount.css?inline';
export const CardOutstandingDiscount = component$(
  ({ productDiscount }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="product-card">
        <a href={`/v/${productDiscount.slug}/${productDiscount.dui}`}>
          {' '}
          <img
            src={productDiscount.images[0]}
            alt={productDiscount.name}
            class="product-image"
          />
        </a>
      </div>
    );
  }
);

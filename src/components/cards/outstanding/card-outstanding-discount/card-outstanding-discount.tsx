import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-discount.css?inline';
export const CardOutstandingDiscount = component$(
  ({ productDiscount }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="category-card">
        <div class="category-info">
          <h1>{productDiscount.name}</h1>
        </div>

        <div class="category-img">
          <img src={productDiscount.images[0]} />
        </div>
        <div class="show-more">
          <a href={`/s-categorie//`}> Ver todos</a>
        </div>
      </div>
    );
  }
);

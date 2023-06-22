import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './product-img-only.css?inline';
import { UseProductDetailsLink } from '~/services/fuction';

export const CtnrCardImageOnly = component$(({ product, ref }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="container">
      <div class="card">
        <a href={UseProductDetailsLink(product, ref)}>
          <img width={100} height={100} src={product.images[0]} alt="Image" />
        </a>

        <div class="nfo">
          <strong class="hs-sr1">${product.price}.00</strong>
        </div>
      </div>
    </div>
  );
});

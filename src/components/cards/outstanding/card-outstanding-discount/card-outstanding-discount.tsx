import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-discount.css?inline';
import { LabelSaveRed } from '~/components/use/label/labelSaveRed';
export const CardOutstandingDiscount = component$(
  ({ productDiscount }: any) => {
    useStylesScoped$(styles);
    return (
      <div class="category-card">
        <div class="container-a">
          <div class="category-info">
            <h1>Mas popular en descuentos</h1>
          </div>
          <div class="container-label-save">
            <LabelSaveRed product={productDiscount} />
          </div>
          <div class="show-more">
            <a href={`/s-categorie//`}> Ver todos</a>
          </div>
        </div>

        <div class="image-container">
          <img src={productDiscount.images[0]} />
        </div>
      </div>
    );
  }
);

import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './card-outstanding-discount.css?inline';
import { LabelSaveRed } from '~/components/use/label/labelSaveRed';
import { useNavigate } from '@builder.io/qwik-city';
export const CardOutstandingDiscount = component$(
  ({ productDiscount }: any) => {
    useStylesScoped$(styles);
    const nav = useNavigate();
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

        <div
          class="image-container"
          onClick$={() =>
            nav('/v/' + productDiscount.slug + '/' + productDiscount.dui, true)
          }
        >
          <img src={productDiscount.images[0]} />
        </div>
      </div>
    );
  }
);

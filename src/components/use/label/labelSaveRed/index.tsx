import { component$, useStylesScoped$ } from '@builder.io/qwik';
import styles from './index.css?inline';
import { UsePrice } from '../../price/price';
export const LabelSaveRed = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const discount = (product.price * product.discount) / 100;
  return (
    <div class="container-all">
      <div class="ctr-porce-red ">
        <h6 class="porce  ">
          -%
          {product.discount}
        </h6>
      </div>
      <div class="ctr-save-pr">
        SAVE <UsePrice price={discount} />
      </div>
    </div>
  );
});

import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-by-seller.css?inline';
import { CtnrCardImageOnly } from '~/components/cards/product-img-only/product-img-only';
import { DouveryAdd } from '~/components/icons/add';

export const ContainerCombinedBySeller = component$(({ data }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="crrts-csrtos">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Combinaciones por el vendedor</hs-sr3>
          <a-sr1-info>Saber mas</a-sr1-info>
        </div>

        <p-sr1>Obtienes un descuento al comprar combinados</p-sr1>
      </div>

      <div class="p-istnr">
        {data.map((val: any, key: any) => (
          <>
            <CtnrCardImageOnly product={val} key={key} />
            {key !== data.length - 1 && (
              <div class="slxr">
                <DouveryAdd />
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
});

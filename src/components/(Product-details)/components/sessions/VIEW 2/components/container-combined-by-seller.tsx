import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-by-seller.css?inline';
import { CtnrCardImageOnly } from '~/components/cards/product-img-only/product-img-only';
import { DouveryAdd } from '~/components/icons/add';
import { ContainerCombinedAGG } from './container-combined-agg';
import { DouveryEqual } from '~/components/icons/equal';

export const ContainerCombinedBySeller = component$(({ data }: any) => {
  useStylesScoped$(styles);

  return (
    <div class="crrts-csrtos">
      <div class="crrts-title">
        <div class="ofrs">
          <hs-sr3>Combinaciones por el vendedor</hs-sr3>
          <div class="srs-v">
            <a-sr1-info>Saber mas</a-sr1-info>
          </div>
        </div>

        <p-sr1>Obtienes un descuento al comprar combinados</p-sr1>
        <div class="srs-md">
          <a-sr1-info>Saber mas</a-sr1-info>
        </div>
      </div>

      <div class="psr-sor">
        {' '}
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
          <div class="srtr-eqs">
            {' '}
            <DouveryEqual />
          </div>
        </div>
        <div class="dirs">
          <ContainerCombinedAGG totalPrice="$15" />
        </div>
      </div>
    </div>
  );
});

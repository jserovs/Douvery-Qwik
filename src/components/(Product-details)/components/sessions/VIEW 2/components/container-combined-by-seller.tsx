import { component$, useStylesScoped$ } from '@builder.io/qwik';

import styles from './css/container-combined-by-seller.css?inline';
import { CtnrCardImageOnly } from '~/components/cards/product-img-only/product-img-only';
import { DouveryAdd } from '~/components/icons/add';

export const ContainerCombinedBySeller = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const data = [
    {
      images: ['https://via.placeholder.com/150x150'],
      price: '19',
    },
  ];

  return (
    <div class="crrts-csrtos">
      <div class="p-istnr">
        <CtnrCardImageOnly product={product} />
        <div class="slxr">
          <DouveryAdd />
        </div>
        {data.map((val: any, key: any) => (
          <CtnrCardImageOnly product={val} key={key} />
        ))}
      </div>
    </div>
  );
});

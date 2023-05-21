import {
  component$,
  useSignal,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';

import styles from './index.css?inline';

// import { fetchProduct } from '~/services/fechProduct';

// import { cleanUpParams } from '~/utils/cleurs';
// import { execute } from '~/utils/api';
// import { getProductQuery } from '~/services/query';
import { fetchProduct } from '~/services/fechProduct';

import type { DocumentHead } from '@builder.io/qwik-city';

import { routeLoader$, useLocation } from '@builder.io/qwik-city';
import ContainerDatails from '~/components/(Product-details)/components/container-datails';

import { View2 } from '~/components/(Product-details)/components/sessions/VIEW 2/view2';
import { View1 } from '~/components/(Product-details)/components/sessions/VIEW 1/view1';
import { View4 } from '~/components/(Product-details)/components/sessions/VIEW 4/view4';

import { View5 } from '~/components/(Product-details)/components/sessions/VIEW 5/view5';
import { addToViewedProducts } from '~/services/viewed/viewed';

export const useProductInfo = routeLoader$(async (requestEvent) => {
  const dui = requestEvent.params.dui;
  const product = await fetchProduct(dui);
  return product;
});

export default component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();

  const productData = useProductInfo();

  const isOpen = useStore({ setIsOpen: false });
  const descriptionEdit = useSignal(`

 `);

  useVisibleTask$(() => {
    addToViewedProducts({ dui: location.params.dui });
  });
  return (
    <>
      <div>
        <div class="nd-det-1">
          <ContainerDatails is={isOpen} props={productData.value} />
        </div>

        <View1 props={productData.value} />
        <View2 product={productData.value} />
        <div
          class="description-edit"
          dangerouslySetInnerHTML={descriptionEdit.value}
        />
        {/* <View3 product={state.product} /> */}
        <View4 product={productData.value} />
        <div class="container-views">
          <View5 product={productData.value} />
        </div>
      </div>
    </>
  );
});
export const head: DocumentHead = ({ resolveValue, params }) => {
  const product = resolveValue(useProductInfo);
  return {
    title: `${product.name} - Douvery`,
    meta: [
      {
        name: 'description',
        content: product.description,
      },
      {
        name: 'dui',
        content: params.dui,
      },
    ],
  };
};

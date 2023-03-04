import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './index.css?inline';

// import { fetchProduct } from '~/services/fechProduct';

// import { cleanUpParams } from '~/utils/cleurs';
// import { execute } from '~/utils/api';
// import { getProductQuery } from '~/services/query';
import { fetchProduct } from '~/services/fechProduct';
import type { Product } from '~/utils/types';
import type { DocumentHead } from '@builder.io/qwik-city';

import { useLocation } from '@builder.io/qwik-city';
import ContainerDatails from '~/components/(Product-details)/components/container-datails';
import { cleanUpParams } from '~/utils/cleurs';
import { View2 } from '~/components/(Product-details)/components/sessions/VIEW 2/view2';
import { View1 } from '~/components/(Product-details)/components/sessions/VIEW 1/view1';
import { View4 } from '~/components/(Product-details)/components/sessions/VIEW 4/view4';
import { View3 } from '~/components/(Product-details)/components/sessions/VIEW 3/view3';
import { View5 } from '~/components/(Product-details)/components/sessions/VIEW 5/view5';

export default component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();

  const state = useStore<{
    product: Product;
  }>(
    {
      product: {} as Product,
    },
    { recursive: true }
  );

  useTask$(async ({ track }) => {
    track(() => location.params.dui);
    const { dui } = cleanUpParams({ dui: location.params.dui });
    const product = await fetchProduct(dui);
    state.product = product;
  });

  const productResource = useResource$<void>(async () => {
    const { dui } = cleanUpParams({ dui: location.params.dui });
    const product = await fetchProduct(dui);
    state.product = product;
  });

  // const ageResource = useResource$<{
  //   [x: string]: any;
  //   Product: Product;
  // }>(async () => fetchProduct('D99658'));

  // const store = useStore<{ name?: string }>({
  //   name: undefined,
  // });
  const isOpen = useStore({ setIsOpen: false });

  return (
    <>
      <div>
        <Resource
          value={productResource}
          onPending={() => <></>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <>
              {}
              <div class="nd-det-1">
                <ContainerDatails is={isOpen} props={state.product} />
              </div>

              <View1 props={state.product} />
              <View2 product={state.product} />
              <View3 product={state.product} />
              <View4 product={state.product} />
              <View5 product={state.product} />
            </>
          )}
        />
      </div>
    </>
  );
});
export const head: DocumentHead = {
  title: 'Douvery',
  meta: [
    {
      name: 'description',
      content: 'Qwik site description',
    },
  ],
};

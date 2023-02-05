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

export default component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();

  const state = useStore<{
    product: Product;
    selectedVariantId: string;
    quantity: Record<string, number>;
    addItemToOrderError: string;
    count: 0;
  }>(
    {
      product: {} as Product,
      selectedVariantId: '',
      quantity: {},
      addItemToOrderError: '',
      count: 0,
    },
    { recursive: true }
  );

  useTask$(async ({ track }) => {
    track(() => location.params.dui);
    // will run when the component mounts and every time "store.count" changes

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
          onPending={() => <>Cargando...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <>
              <div class="nd-det-1">
                <ContainerDatails is={isOpen} props={state.product} />
              </div>

              <View1 props={state.product} />
              <View2 product={state.product} />
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

import {
  Resource,
  component$,
  useResource$,
  useSignal,
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
// import { View3 } from '~/components/(Product-details)/components/sessions/VIEW 3/view3';
import { View5 } from '~/components/(Product-details)/components/sessions/VIEW 5/view5';
import { View3 } from '~/components/(Product-details)/components/sessions/VIEW 3/view3';

export default component$(() => {
  useStylesScoped$(styles);
  const location = useLocation();

  const state = useStore<{
    product: Product;
  }>({
    product: {} as Product,
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
  const descriptionEdit = useSignal(`

 `);

  useTask$(() => {});
  return (
    <>
      <div>
        <Resource
          value={productResource}
          onPending={() => <div class="loader "></div>}
          onRejected={() => (
            <>
              Al parecer, hay un error en la solicitud. Por favor, actualiza la
              página para verificar nuevamente.
            </>
          )}
          onResolved={() => (
            <>
              <div class="nd-det-1">
                <ContainerDatails is={isOpen} props={state.product} />
              </div>

              <View1 props={state.product} />
              <View2 product={state.product} />
              <div
                class="description-edit"
                dangerouslySetInnerHTML={descriptionEdit.value}
              />
              <View3 product={state.product} />
              <View4 product={state.product} />
              <div class="container-views">
                <View5 product={state.product} />
              </div>
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

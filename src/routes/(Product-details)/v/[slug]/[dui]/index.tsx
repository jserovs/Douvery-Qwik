import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';

import styles from './index.css?inline';

// import { fetchCharacters } from '~/services/fechProduct';

// import { cleanUpParams } from '~/utils/cleurs';
// import { execute } from '~/utils/api';
// import { getProductQuery } from '~/services/query';
import { fetchCharacters } from '~/services/fechProduct';
import type { Product } from '~/utils/types';
import type { DocumentHead } from '@builder.io/qwik-city';

import { useLocation } from '@builder.io/qwik-city';
import ContainerDatails from '~/components/(Product-details)/components/container-datails';
import { cleanUpParams } from '~/utils/cleurs';
import { ContainerViewsIMGDetails } from '~/components/(Product-details)/components/container-views-images-details';

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

    const product = await fetchCharacters(dui);

    state.product = product;
  });

  const productResource = useResource$<void>(async () => {
    const { dui } = cleanUpParams({ dui: location.params.dui });

    const product = await fetchCharacters(dui);

    state.product = product;
  });

  // const ageResource = useResource$<{
  //   [x: string]: any;
  //   Product: Product;
  // }>(async () => fetchCharacters('D99658'));

  // const store = useStore<{ name?: string }>({
  //   name: undefined,
  // });

  return (
    <>
      <div>
        <Resource
          value={productResource}
          onPending={() => <>Cargando...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <>
              <ContainerDatails props={state.product} />
              <ContainerViewsIMGDetails props={state.product} />
            </>
          )}
        />

        <div class="container-details ">
          <div class="container-mobiles-button"></div>
        </div>
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

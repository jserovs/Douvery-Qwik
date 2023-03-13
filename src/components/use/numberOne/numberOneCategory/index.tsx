import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import { fetchProductBestInCategory } from '~/services/fechProduct';
import { cleanUpParamsID } from '~/utils/cleurs';
import type { Product } from '~/utils/types';
import styles from './index.css?inline';
export const UseNumberOneCategory = component$(({ product }: any) => {
  useStylesScoped$(styles);
  const stateBest = useStore<{
    product: Product;
  }>(
    {
      product: {} as Product,
    },
    { recursive: true }
  );
  const productResource = useResource$<void>(async () => {
    const { category } = cleanUpParamsID({ category: product.category });
    const products = await fetchProductBestInCategory(category);

    stateBest.product = products;
  });
  return (
    <>
      <Resource
        value={productResource}
        onPending={() => <>Cargando ...</>}
        onRejected={(error) => <>Error: {error.message}</>}
        onResolved={() => (
          <>
            {stateBest.product.dui === product.dui ? (
              <div class="ctr-1">
                {' '}
                <div class="top-1">#1 De </div>
                <p> {product.category}</p>
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      />
    </>
  );
});

import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';

import { fetchProduct } from '~/services/fechProduct';

import type { Product } from '~/utils/types';
import styles from './card-product-variant.css?inline';

export const CardProductVariations1 = component$(
  ({ dui, slug, imgS, imgP }: any) => {
    useStylesScoped$(styles);
    const state = useStore<{
      product: Product;
      selectedVariantId: string;
      quantity: Record<string, number>;
      addItemToOrderError: string;
      count: 0;
    }>({
      product: {} as Product,
      selectedVariantId: '',
      quantity: {},
      addItemToOrderError: '',
      count: 0,
    });

    const productResource = useResource$<void>(async () => {
      const product = await fetchProduct(dui);

      state.product = product;
    });

    console.log(imgS.setImage);
    return (
      <div class="crtr-product-image">
        <Resource
          value={productResource}
          onPending={() => <>Cargando...</>}
          onRejected={() => (
            <>
              Al parecer, hay un error en la solicitud. Por favor, actualiza la
              página para verificar nuevamente.
            </>
          )}
          onResolved={() => (
            <>
              <a
                href={`/v/${state.product.slug}/${state.product.dui}`}
                class="my-link"
              >
                <div
                  class={
                    slug.dui === state.product.dui
                      ? 'container-card-options active'
                      : 'container-card-options '
                  }
                >
                  <img
                    width={100}
                    height={100}
                    class="product-image-car"
                    src={state.product.images?.[0]}
                    alt={state.product.name}
                    onMouseOver$={() =>
                      (imgS.setImage = state.product.images[0])
                    }
                    onMouseOut$={() => (imgS.setImage = imgP)}
                  />
                </div>
              </a>
            </>
          )}
        />
      </div>
    );
  }
);

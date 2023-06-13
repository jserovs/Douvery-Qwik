import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './outstanding-product-flex-1.css?inline';
import { CardOutstandingDiscount } from '~/components/cards/outstanding/card-outstanding-discount/card-outstanding-discount';
import type { Product } from '~/utils/types';
import { fetchProductsOutstanding } from '~/services/outstanding/outstanding';
import { CardOutstandingPopular } from '~/components/cards/outstanding/card-outstanding-popular copy/card-outstanding-popular';

export const OutstandingProductFlex1 = component$(() => {
  useStylesScoped$(styles);
  const prodcureducer = useResource$<Product[]>(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchProductsOutstanding(controller);
  });
  return (
    <div class="container-all">
      <Resource
        value={prodcureducer}
        onPending={() => <div class="loader"></div>}
        onRejected={() => (
          <>
            Al parecer, hay un error en la solicitud. Por favor, actualiza la
            página para verificar nuevamente.
          </>
        )}
        onResolved={(data: any) => (
          <>
            {' '}
            {data.length === 0 ? (
              <p>No hay productos para mostrar.</p>
            ) : (
              <>
                <CardOutstandingPopular
                  productPopular={data.mostPopularProduct}
                />
                <CardOutstandingDiscount
                  productDiscount={data.mostDiscountedProduct}
                />{' '}
              </>
            )}
          </>
        )}
      />{' '}
    </div>
  );
});

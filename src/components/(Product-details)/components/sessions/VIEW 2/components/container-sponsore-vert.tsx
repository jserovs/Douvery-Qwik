import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './css/container-sponsore.css?inline';

import type { Product } from '~/utils/types';
import { fetchSystemRecomendationProductU } from '~/services/fechProduct';
import { ContainerCardProduct9 } from '~/components/cards/product/product-card-9/product-card-9';

export const SponsoredProductContainer = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const productReducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => product.dui);
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const dui = product.dui;
    return fetchSystemRecomendationProductU(dui, 1);
  });

  return (
    <>
      {' '}
      {product.sponsored === true ? (
        <></>
      ) : (
        <>
          <div class="crtrs-bsc">
            <div class="div-car">
              {' '}
              <Resource
                value={productReducer}
                onPending={() => <div class="loader"></div>}
                onRejected={() => (
                  <>
                    Al parecer, hay un error en la solicitud. Por favor,
                    actualiza la página para verificar nuevamente.
                  </>
                )}
                onResolved={(data: any) => (
                  <>
                    {data.length === 0 ? (
                      <p>No hay productos para mostrar.</p>
                    ) : (
                      <>
                        {data.map((val: any, key: any) => (
                          <div key={key}>
                            <ContainerCardProduct9 product={val} />
                          </div>
                        ))}
                      </>
                    )}
                  </>
                )}
              />
              <div> </div>
            </div>
          </div>
        </>
      )}
    </>
  );
});

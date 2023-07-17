import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './carousel-recomend-quantyview-product.css?inline';
import type { Product } from '~/utils/types';

import { fetchSystemRecomendationProductU } from '~/services/fechProduct';

import { ContainerCardProduct6 } from '~/components/cards/product/product-card-6/product-card-6';
export const Carousel_QuantiyViewedProducts = component$(
  ({ product, qty }: any) => {
    useStylesScoped$(style);

    const productReducer = useResource$<Product[]>(
      async ({ cleanup, track }) => {
        track(() => product.dui);
        const controller = new AbortController();
        cleanup(() => controller.abort());
        const dui = product.dui;
        return fetchSystemRecomendationProductU(dui, qty);
      }
    );

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
                              <ContainerCardProduct6 product={val} />
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
  }
);

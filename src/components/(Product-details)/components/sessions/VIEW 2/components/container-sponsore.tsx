import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';

import styles from './css/container-sponsore.css?inline';
import { ContainerCardProduct1 } from '~/components/cards/product/product-card-1/product-card-1';
import { DouveryArrowRigth1 } from '~/components/icons/arrow-right-1';

import type { Product } from '~/utils/types';
import { fetchProductCategory } from '~/services/fechProduct';

export const ContainerSponsoreProduct = component$(({ product }: any) => {
  useStylesScoped$(styles);

  const productReducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => product.dui);
    const category = product.category;
    const dui = product.dui;
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return await fetchProductCategory(category, dui, 2);
  });
  return (
    <>
      {' '}
      {product.sponsored === true ? (
        <></>
      ) : (
        <>
          <div class="crtrs-bsc">
            <div class="crrts-title">
              <hs-sr3>Pueden ser de tu interés</hs-sr3>
              <div class="sr-of">
                {' '}
                <div class="ssr-f">
                  {' '}
                  <a href="/" class="ps-sr1">
                    {' '}
                    Ver mas
                  </a>
                  <DouveryArrowRigth1 size="20" />
                </div>
              </div>
            </div>
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
                        {' '}
                        {data.map((val: any, key: any) => (
                          <div key={key}>
                            <ContainerCardProduct1 product={val} />
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

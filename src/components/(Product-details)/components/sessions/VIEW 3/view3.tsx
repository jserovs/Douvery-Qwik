import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import style from './view3.css?inline';
import type { Product } from '~/utils/types';
import { fetchSystemRecomendationProductU } from '~/services/fechProduct';
import { Carousel2 } from '~/components/use/carousel/carousel-2/carousel-2';
import { randomNum } from '~/services/fuction';

export const View3 = component$(({ product }: any) => {
  useStylesScoped$(style);
  const state = useStore({
    productResults: [] as Product[],
    loader: false,
  });

  const productReducer = useResource$<Product[]>(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());
    const dui = product.dui;
    const data = await fetchSystemRecomendationProductU(dui, 25, controller);
    return data;
  });

  const randomNumber = randomNum();
  return (
    <div class="ctnr-view-3">
      <>
        <div class={state.loader ? 'loader' : ''}></div>
      </>{' '}
      <div class="content">
        <div class="crrts-title">
          <div class="ofrs">
            <hs-sr3>Detalles del producto</hs-sr3>
            <div class="srs-v">
              <a href="/" class="ps-sr1">
                Saber mas
              </a>
            </div>
          </div>
          <p class="ps-sr1">Detalles interesantes del producto</p>
          <div class="srs-md">
            <a class="ps-sr1">Saber mas</a>
          </div>
        </div>
      </div>
      {product.sponsored === true ? (
        <></>
      ) : (
        <>
          {' '}
          <div class="content-carousel">
            <p class="ps-sr1">Productos similares</p>
            <Resource
              value={productReducer}
              onPending={() => <div class="loader"></div>}
              onRejected={() => (
                <>
                  Al parecer, hay un error en la solicitud. Por favor, actualiza
                  la página para verificar nuevamente.
                </>
              )}
              onResolved={(data: any) => (
                <>
                  {data.length === 0 ? (
                    <p>No hay productos para mostrar.</p>
                  ) : (
                    <>
                      <Carousel2
                        key={randomNumber}
                        styleCard={10}
                        product={data}
                      />
                    </>
                  )}
                </>
              )}
            />
          </div>
        </>
      )}{' '}
    </div>
  );
});

import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import type { Product } from '~/utils/types';
import { type DocumentHead, useLocation } from '@builder.io/qwik-city';
import { fetchCategoryAllProducts } from '~/services/categorie/categorie';
import { Paginator1 } from '~/components/use/paginator/paginator-1/paginator-1';

import { Filter_Product1 } from '~/components/use/filters/filter-product-1/filter-product-1';
import { Promotion_CarouselAllInterest } from '~/components/(Promotions)/carousel/carousel-all-interest/carousel-all-interest';
import { ContainerCardProduct8 } from '~/components/cards/product/product-card-8/product-card-8';
import { ContainerCardProduct5 } from '~/components/cards/product/product-card-5/product-card-5';
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const pg = loc.url.searchParams.get('pg') || '';
  const sortOrder = useSignal('asc');
  const currentPage = useSignal((pg && parseInt(pg)) || 1);

  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(
      () =>
        sortOrder.value &&
        currentPage.value &&
        loc.url.searchParams.get('or-sc')
    );

    const controller = new AbortController();
    cleanup(() => controller.abort());
    const subcategory = loc.url.searchParams.get('or-sc') || '';
    return fetchCategoryAllProducts(
      loc.params.categorie,
      subcategory,
      currentPage.value,
      sortOrder.value,
      controller
    );
  });

  const handleSortOrderChange = $(() => {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  });
  return (
    <div class="container-all">
      <div class="container-product-categorie">
        <Resource
          value={prodcureducer}
          onPending={() => (
            <div class="container-body">
              <div class="loader"></div>
            </div>
          )}
          onRejected={() => (
            <>
              Al parecer, hay un error en la solicitud. Por favor, actualiza la
              página para verificar nuevamente.
            </>
          )}
          onResolved={(data: any) => (
            <>
              {' '}
              {data.products.length === 0 ? (
                <p>No hay productos para mostrar.</p>
              ) : (
                <ul>
                  <div class="container-title">
                    <div class="container-discount-porce">
                      <div class="container-sort">
                        <button onClick$={handleSortOrderChange}>
                          {sortOrder.value == 'asc' ? (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="m7 14l5-5l5 5z" />
                              </svg>
                              <p>Biggest price</p>
                            </>
                          ) : (
                            <>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                              >
                                <path fill="currentColor" d="m7 10l5 5l5-5z" />
                              </svg>
                              <p>Less price</p>
                            </>
                          )}
                        </button>
                      </div>
                      <div class="container-or">
                        <div class="ctr-opa">|</div>
                        <div>Or</div>{' '}
                      </div>
                    </div>
                    <h1>
                      Sumérgete en{' '}
                      <span class="name-categorie">{loc.params.categorie}</span>
                    </h1>
                  </div>
                  <div class="container-body">
                    <div class="container-filters">
                      <Filter_Product1 subCategories={data.subCategories} />
                    </div>
                    <div class="container-product">
                      {data.products.map((product: any) => {
                        let CardComponent;

                        // Decide qué componente usar según el descuento
                        if (product.discount >= 8) {
                          CardComponent = (
                            <ContainerCardProduct8
                              product={product}
                              primaryColor={data.primaryColor}
                              secondaryColor={data.secondaryColor}
                            />
                          );
                        } else {
                          CardComponent = (
                            <ContainerCardProduct5
                              product={product}
                              primaryColor={data.primaryColor}
                              secondaryColor={data.secondaryColor}
                            />
                          );
                        }

                        return <li key={product.id}>{CardComponent}</li>;
                      })}
                    </div>
                  </div>
                </ul>
              )}
              <Paginator1
                currentPage={data.currentPage}
                totalPages={data.totalPages}
                onPageChange={currentPage}
              />
            </>
          )}
        />
        <div class="container-carousel-recomend">
          <Promotion_CarouselAllInterest styleNumber={11} />
        </div>
      </div>
    </div>
  );
});

export const head: DocumentHead = () => {
  return {
    title: `Categoria en Douvery`,
    meta: [
      {
        name: 'description',
        content: 'Busca y encuentra los mejores productos en Douvery',
      },
    ],
  };
};

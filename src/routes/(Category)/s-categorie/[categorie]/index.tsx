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
import { useLocation } from '@builder.io/qwik-city';
import { fetchCategoryAllProducts } from '~/services/categorie/categorie';
import { Paginator1 } from '~/components/use/paginator/paginator-1/paginator-1';
import { ContainerCardProduct10 } from '~/components/cards/product/product-card-10/product-card-10';
import { Promotion_CarouselInterest } from '~/components/(Promotions)/carousel/carousel-inters/carousel-interest';
import { Filter_Product1 } from '~/components/use/filters/filter-product-1/filter-product-1';
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
                      <div class="ctr-opa">|</div>
                      <div>Or</div>{' '}
                    </div>
                    <h1>Immerse yourself in the {loc.params.categorie}</h1>
                  </div>
                  <div class="container-body">
                    <div class="container-filters">
                      <Filter_Product1 subCategories={data.subCategories} />
                    </div>
                    <div class="container-product">
                      {' '}
                      {data.products.map((product: any) => (
                        <>
                          <li key={product.id}>
                            <ContainerCardProduct10
                              product={product}
                              primaryColor={data.primaryColor}
                              secondaryColor={data.secondaryColor}
                            />
                          </li>
                        </>
                      ))}
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
      </div>

      <Promotion_CarouselInterest styleNumber={10} />
    </div>
  );
});

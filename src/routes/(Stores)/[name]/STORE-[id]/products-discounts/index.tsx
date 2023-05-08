import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { fetchStoreProductsDiscounts } from '~/services/store/store';
import type { Product } from '~/utils/types';
import styles from './index.css?inline';
import { Paginator1 } from '~/components/use/paginator/paginator-1/paginator-1';
import { ContainerCardProduct8 } from '~/components/cards/product/product-card-8/product-card-8';
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const pg = loc.url.searchParams.get('pg') || '';
  const sortOrder = useSignal('asc');
  const currentPage = useSignal((pg && parseInt(pg)) || 1);
  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => sortOrder.value && currentPage.value);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchStoreProductsDiscounts(
      loc.params.id,
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
      {' '}
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
            {data.discountProducts.length === 0 ? (
              <p>No hay productos para mostrar.</p>
            ) : (
              <ul>
                <div class="container-title">
                  <h1>
                    Descubre y sumérgete en los articulos con descuentos de{' '}
                    {loc.params.name}
                  </h1>
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
                            <p>Biggest discount</p>
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
                            <p>Less discount</p>
                          </>
                        )}
                      </button>
                    </div>
                    <div class="ctr-opa">|</div>
                    <div class="container-discount">
                      <span>{data.minDiscount}%</span> <span>-</span>{' '}
                      <span>{data.maxDiscount}%</span>
                    </div>
                    <h2>Descuentos</h2>{' '}
                  </div>
                </div>
                {data.discountProducts.map((product: any) => (
                  <>
                    <li key={product.id}>
                      <ContainerCardProduct8
                        product={product}
                        primaryColor={data.primaryColor}
                        secondaryColor={data.secondaryColor}
                      />
                    </li>
                  </>
                ))}
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
  );
});

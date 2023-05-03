import {
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { ContainerCardProduct7 } from '~/components/cards/product/product-card-7/product-card-7';
import { fetchStoreProductBySubCategorie } from '~/services/store/store';
import type { Product } from '~/utils/types';
import styles from './index.css?inline';
import { Paginator1 } from '~/components/use/paginator/paginator-1/paginator-1';
export default component$(() => {
  useStylesScoped$(styles);
  const loc = useLocation();

  const currentPage = useSignal(1);
  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => loc.params.categories && currentPage.value);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchStoreProductBySubCategorie(
      loc.params.id,
      loc.params.categories,
      currentPage.value,
      controller
    );
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
            {data.products.length === 0 ? (
              <p>No hay productos para mostrar.</p>
            ) : (
              <ul>
                <div class="container-title">
                  <h1>
                    Descubre y sumérgete en los articulos de {loc.params.name}
                  </h1>
                </div>
                {data.products.map((product: any) => (
                  <>
                    <li key={product.id}>
                      <ContainerCardProduct7
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

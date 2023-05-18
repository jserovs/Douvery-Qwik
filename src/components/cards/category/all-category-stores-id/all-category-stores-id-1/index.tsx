import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { fetchStoreCategoriesDiscounts } from '~/services/store/store';
import type { Product } from '~/utils/types';
import styles from './index.css?inline';
import { CategoryGrid2 } from '~/components/use/Categories/CategoryGrid2/category-grid-2';
export default component$(({ storeId }: any) => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => loc.params.id);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchStoreCategoriesDiscounts(loc.params.id || storeId, controller);
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
            {data.categories.length === 0 ? (
              <p>No hay productos para mostrar.</p>
            ) : (
              <>
                {' '}
                <img
                  class="store-banner"
                  src={data.store.design.banners[0]}
                  alt="STORE Banner"
                />{' '}
                <ul>
                  {data.categories.map((dat: any) => (
                    <>
                      <li class="box">
                        <CategoryGrid2 categorie={dat} store={data.store} />
                      </li>
                    </>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
      />
    </div>
  );
});

import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { CategoryGrid1 } from '~/components/use/Categories/CategoryGrid1/category-grid-1';
import { fetchStoreCategoriesAndImg } from '~/services/store/store';
import type { Product } from '~/utils/types';
import styles from './index.css?inline';
export default component$(({ storeId, storeName }: any) => {
  useStylesScoped$(styles);
  const loc = useLocation();
  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => loc.params.id);

    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchStoreCategoriesAndImg(loc.params.id || storeId, controller);
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
                <div class="container-title">
                  <h1>
                    Descubre todas las categorias de{' '}
                    {loc.params.name ? loc.params.name : storeName}
                  </h1>
                </div>
                <ul>
                  {data.categories.map((dat: any) => (
                    <>
                      <li class="box">
                        <CategoryGrid1 categorie={dat} />
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

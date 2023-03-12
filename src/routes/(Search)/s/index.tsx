import { Resource, component$, useResource$ } from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { fetchSearchProduct } from '~/services/fechProduct';

import type { Product } from '~/utils/types';

export default component$(() => {
  const { url } = useLocation();

  const prodcureducer = useResource$<Product[]>(async ({ cleanup, track }) => {
    track(() => url.search);

    const controller = new AbortController();
    cleanup(() => controller.abort());
    const category = url.searchParams.get('or-c') || 'all';
    const query = url.searchParams.get('q') || '';
    const price = url.searchParams.get('or-p') || 'all';
    const rating = url.searchParams.get('or-r') || 'all';
    const order = url.searchParams.get('or-or') || 'newest';
    const page = url.searchParams.get('or-p') || 1;
    return fetchSearchProduct(
      category,
      query,
      price,
      rating,
      order,
      page,
      controller
    );
  });

  return (
    <div>
      <div class="sm:col-span-5 lg:col-span-4">
        <Resource
          value={prodcureducer}
          onPending={() => <>Cargando...</>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(products) => (
            <ul>
              {products.map((user: any) => (
                <li key={user.id}>{user.name}</li>
              ))}
            </ul>
          )}
        />
      </div>
    </div>
  );
});

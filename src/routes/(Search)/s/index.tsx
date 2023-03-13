import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import { fetchSearchProduct } from '~/services/fechProduct';
import styles from './index.css?inline';
import type { Product } from '~/utils/types';
import { Card1S } from '~/components/cards/search/card-1-s/card-1-s';

export default component$(() => {
  useStylesScoped$(styles);
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
    <div class="grid-container">
      <div class="filter-section"></div>
      <div class="product-section">
        <Resource
          value={prodcureducer}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={(products) => (
            <ul>
              {products.map((product: any) => (
                <li key={product.id}>
                  <Card1S product={product} />
                </li>
              ))}
            </ul>
          )}
        />
      </div>
      <div class="empty-section"></div>
    </div>
  );
});

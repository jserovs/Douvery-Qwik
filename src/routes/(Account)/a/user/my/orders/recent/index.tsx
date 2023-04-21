import {
  Resource,
  component$,
  useResource$,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { type DocumentHead } from '@builder.io/qwik-city';

import type { UserOrders } from '~/utils/types';
import { fetchOrdesUser } from '~/services/user/order/order';
import { CardOrdersC1 } from '~/components/cards/orders/orders-1/orders-1';

export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;

  const ordersResource = useResource$<UserOrders[]>(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchOrdesUser(`${userACC?.token}`, `${userACC?.id}`);
  });
  return (
    <div class="container-all">
      {' '}
      <div>
        {' '}
        <div class="container-existing">
          <div class="options">
            <h6></h6>
            <Resource
              value={ordersResource}
              onPending={() => <div class="loader"></div>}
              onRejected={(error) => <>Error: {error.message}</>}
              onResolved={(orders) => (
                <>
                  {' '}
                  <ul>
                    {orders.length === 0 ? (
                      <p>No hay productos para mostrar.</p>
                    ) : (
                      <ul>
                        {orders.map((order: any) => (
                          <div key={order} class="container-orders">
                            <li key={order.id}>
                              <CardOrdersC1 order={order} />
                            </li>
                            <div class="container-options">
                              Options
                              <div class="card-options">
                                <button>View order</button>
                                <button>Alert change</button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    )}
                  </ul>
                </>
              )}
            />
          </div>
        </div>
      </div>
      <div class="separator">
        <p>Completed order</p>
        <hr class="line" />
      </div>
    </div>
  );
});

export const head: DocumentHead = {
  title: 'Douvery - Mis ordenes',
  meta: [
    {
      name: 'Mis ordenes',
      content: 'Douvery - Mis ordenes',
    },
  ],
};

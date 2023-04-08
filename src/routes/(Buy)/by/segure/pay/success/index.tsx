import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { useLocation } from '@builder.io/qwik-city';
import { fetchUniqueOrderUser } from '~/services/user/order/order';
import type { Order } from '~/utils/types';
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const loc = useLocation();
  const state = useStore<{
    order: Order;
  }>(
    {
      order: {} as Order,
    },
    { recursive: true }
  );
  const orderInfoResource = useResource$<void>(async ({ track }) => {
    track(() => loc.url.searchParams.get('order'));
    const data = await fetchUniqueOrderUser(
      `${userACC?.token}`,
      `${loc.url.searchParams.get('order')}`
    );
    state.order = data;
  });

  console.log(userACC?.id, userACC?.token);
  return (
    <div class="container">
      <div class="success-message">
        <h1>Thank you for your purchase!</h1>
        <p>
          Your order has been successfully placed and will be delivered soon.
        </p>
        <Resource
          value={orderInfoResource}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => <div>{state.order.orderId}</div>}
        />
        <a href="/" class="button">
          Continue Shopping
        </a>
      </div>
    </div>
  );
});

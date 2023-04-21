import {
  $,
  Resource,
  component$,
  useResource$,
  useSignal,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import {
  globalAction$,
  type DocumentHead,
  zod$,
  z,
  Form,
} from '@builder.io/qwik-city';

import type { UserOrders } from '~/utils/types';
import { fetchOrdesUser } from '~/services/user/order/order';
import { CardOrdersC1 } from '~/components/cards/orders/orders-1/orders-1';
import { urlServerLocal } from '~/services/fechProduct';
import { DATA_ACCESS_COOKIE_NAME } from '~/services/auth/login/login';
import {
  decodeToken,
  passwordKEY,
  serverKey,
} from '~/services/auth/token/token';

export const useSubmit = globalAction$(
  async ({ orderId }, { fail, cookie, headers }) => {
    const serverUrl = `${urlServerLocal}/api/orders/user/activate-notification/email`;
    const accessCookie = cookie.get(DATA_ACCESS_COOKIE_NAME)?.value;
    const user = decodeToken(accessCookie, passwordKEY, serverKey);

    const res = await fetch(serverUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': user.token,
      },
      body: JSON.stringify({
        orderId: orderId,
      }),
    });

    const response = await res.json();

    // Verificar el estado de la respuesta HTTP en lugar de 'response.ok'
    if (res.status !== 200) {
      // Utilizar el mensaje de error proporcionado por la API si está disponible
      const errorMessage =
        response.error || response.msg || 'Hubo un error, intente de nuevo';
      return fail(res.status, {
        message: errorMessage,
      });
    }
    if (response.success) {
      headers.set('location', '/a/user/my/orders/recent/');
    } else {
      throw new Error('Error');
    }
  },

  zod$({
    orderId: z.string({
      required_error: 'OrderId is required',
    }),
  })
);
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;

  const action = useSubmit();
  const ordersResource = useResource$<UserOrders[]>(async ({ cleanup }) => {
    const controller = new AbortController();
    cleanup(() => controller.abort());

    return fetchOrdesUser(`${userACC?.token}`, `${userACC?.id}`);
  });

  const showTooltip = useSignal(false);
  const handleMouseEnter = $(() => {
    showTooltip.value = true;
  });

  const handleMouseLeave = $(() => {
    showTooltip.value = false;
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
                      <p>No hay Orders para mostrar, ve a comprar.</p>
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
                                <Form action={action}>
                                  <input
                                    style={{ display: 'none' }}
                                    type="text"
                                    value={order.orderId}
                                    name="orderId"
                                    id="orderId"
                                  />
                                  <button
                                    class="alert-receibe-container"
                                    onMouseEnter$={handleMouseEnter}
                                    onMouseLeave$={handleMouseLeave}
                                  >
                                    {order.notificationEmail
                                      ? 'Disable alert'
                                      : 'Change Alert'}
                                    {showTooltip.value && (
                                      <>
                                        {order.notificationEmail ? (
                                          <span class="tooltip-text">
                                            You will no longer receive
                                            notifications when the order status
                                            updates.
                                          </span>
                                        ) : (
                                          <span class="tooltip-text">
                                            Get notified when the order status
                                            updates, and keep yourself informed.
                                          </span>
                                        )}
                                      </>
                                    )}
                                  </button>
                                </Form>
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

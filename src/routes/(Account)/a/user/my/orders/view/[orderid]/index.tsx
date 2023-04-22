import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
  useTask$,
} from '@builder.io/qwik';
import { useLocation } from '@builder.io/qwik-city';
import styles from './index.css?inline';
import type { Order } from '~/utils/types';
import { useGetCurrentUser } from '~/routes/layout';
import { fetchUniqueOrderUser } from '~/services/user/order/order';
import { QualifyShoppingExperience } from '~/components/(byServices)/Success/session/qualify-shopping-experience/qualify-shopping-experience';
import { UsePrice } from '~/components/use/price/price';
import { TextCL } from '~/components/use/textCL/textCL';
import { DouveryCard } from '~/components/icons/card';
import { PaypalIcon } from '~/components/icons/paypal';
import { formatDate, formatDateWithMinutes } from '~/services/fuction';
import { Card1PurchaseProductOrders } from '~/components/cards/orders/product/purchase-products/purchase-products';

export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const loc = useLocation();

  const state = useStore<{
    order: Order;
    calification: string;
  }>({
    order: {} as Order,
    calification: '',
  });
  const orderInfoResource = useResource$<void>(async ({ track }) => {
    track(() => loc.params.orderid);
    const data = await fetchUniqueOrderUser(
      `${userACC?.token}`,
      `${loc.params.orderid}`
    );
    state.order = data;
  });
  useTask$(async () => {
    const data = await fetchUniqueOrderUser(
      `${userACC?.token}`,
      `${loc.params.orderid}`
    );
    state.order = data;
  });

  return (
    <div class="container-all">
      <div class="container">
        <Resource
          value={orderInfoResource}
          onPending={() => <div class="loader"></div>}
          onRejected={(error) => <>Error: {error.message}</>}
          onResolved={() => (
            <div class="container-info-order">
              <ul>
                <li>
                  <span>
                    <p>Numero de orden:</p>
                  </span>
                  <span>
                    <em> {state.order.orderId}</em>
                  </span>
                </li>
                <li>
                  <span>
                    <p>Total articulos:</p>
                  </span>
                  <span>{state.order.ordertotalItems} items</span>
                </li>
                <li>
                  <span>
                    <p>Estado:</p>
                  </span>
                  <span
                    class={state.order.orderIsPaid ? 'verified' : 'no-verified'}
                  >
                    {state.order.orderIsPaid ? 'Facturada' : 'NO Facturada'}
                  </span>
                </li>
                <div class="wrap">
                  <li>
                    <span>
                      <p>Metodo de pago:</p>
                    </span>

                    <span>
                      {state.order.orderPaymentMethod.method == 'paypal' ? (
                        <PaypalIcon size="25px" />
                      ) : (
                        ''
                      )}
                      {state.order.orderPaymentMethod.method ==
                      'stripe - card' ? (
                        <DouveryCard size="22px" />
                      ) : (
                        ''
                      )}

                      <TextCL
                        text={
                          state.order.orderPaymentMethod
                            ? state.order.orderPaymentMethod.method
                            : 'NO Facturada'
                        }
                      />
                    </span>
                  </li>
                  <li>
                    <span>
                      <p>Id method:</p>
                    </span>

                    <span>
                      <TextCL
                        text={
                          state.order.orderPaymentMethod
                            ? state.order.orderPaymentMethod.idMethod
                            : 'NO Facturada'
                        }
                      />
                    </span>
                  </li>
                </div>
                <li>
                  <span>
                    <p>Payment day:</p>
                  </span>
                  <span>{formatDateWithMinutes(state.order.paidAt)}</span>
                </li>
                <div class="wrap">
                  <li>
                    <span>
                      <p>Created order:</p>
                    </span>
                    <span> {formatDate(state.order.createdAt)}</span>
                  </li>
                  <li>
                    <span>
                      <p>Lasted update order:</p>
                    </span>
                    <span> {formatDateWithMinutes(state.order.updatedAt)}</span>
                  </li>
                </div>
                <li>
                  <span>
                    <p>Total pagado:</p>
                  </span>
                  <span>
                    <UsePrice price={state.order.orderTotalAmout} />
                  </span>
                </li>
              </ul>
            </div>
          )}
        />

        <div>
          <QualifyShoppingExperience
            statepr={state}
            orderInfoResource={orderInfoResource}
            coten={true}
          />
        </div>
      </div>
      <>
        {state.order?.orderItems?.map((product: any) => (
          <div class="container-cards-pay" key={product.dui}>
            <Card1PurchaseProductOrders product={product} />
            <div class="container-quantity">
              <p>Quantity: </p> {product.quantity}
            </div>
          </div>
        ))}
      </>
    </div>
  );
});

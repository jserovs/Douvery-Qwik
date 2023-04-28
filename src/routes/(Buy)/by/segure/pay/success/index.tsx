import {
  Resource,
  component$,
  useResource$,
  useStore,
  useStylesScoped$,
} from '@builder.io/qwik';
import styles from './index.css?inline';
import { useGetCurrentUser } from '~/routes/layout';
import { type DocumentHead, useLocation, Link } from '@builder.io/qwik-city';
import { fetchUniqueOrderUser } from '~/services/user/order/order';
import type { Order } from '~/utils/types';
import { TextCL } from '~/components/use/textCL/textCL';
import { UsePrice } from '~/components/use/price/price';
import { PaypalIcon } from '~/components/icons/paypal';
import { InvoiceOrder1 } from '~/components/Invoice/orders/invoice-order-1/invoice-order-1';
import { PrintButton } from '~/components/buttons/print-button/print-button';
import { DownloadButton } from '~/components/buttons/downloand-button/downloand-button';
import { QualifyShoppingExperience } from '~/components/(byServices)/Success/session/qualify-shopping-experience/qualify-shopping-experience';
import { DouveryCard } from '~/components/icons/card';
export default component$(() => {
  useStylesScoped$(styles);
  const userACC = useGetCurrentUser().value;
  const loc = useLocation();

  const state = useStore<{
    order: Order;
    calification: string;
  }>(
    {
      order: {} as Order,
      calification: '',
    },
  
  );
  const orderInfoResource = useResource$<void>(async ({ track }) => {
    track(() => loc.url.searchParams.get('order'));
    const data = await fetchUniqueOrderUser(
      `${userACC?.token}`,
      `${loc.url.searchParams.get('order')}`
    );
    state.order = data;
  });

  const invoiceData = {
    clientName: 'Juan Pérez',
    date: '2023-04-08',
    // ...otros datos de la factura
  };

  return (
    <div class="container-all">
      <div class="container">
        <div class="success-message">
          <div class="container-title-thanks">
            <h2 class="titleThank">Thank you for your purchase!</h2>
          </div>
          <p>
            Your order has been successfully placed and will be delivered soon.
          </p>
          <Resource
            value={orderInfoResource}
            onPending={() => <div class="loader"></div>}
            onRejected={() => (
              <>
                Al parecer, hemos cometido un error. Por favor, actualiza la
                página para verificar nuevamente.
              </>
            )}
            onResolved={() => (
              <div class="container-info-order">
                <div class="container-invoice-print">
                  <InvoiceOrder1 invoiceData={invoiceData} state={state} />
                </div>

                <ul>
                  <li>
                    <span>
                      <strong>Numero de orden:</strong>
                    </span>
                    <span>{state.order.orderId}</span>
                  </li>
                  <li>
                    <span>
                      <strong>Total articulos:</strong>
                    </span>
                    <span>{state.order.ordertotalItems} items</span>
                  </li>
                  <li>
                    <span>
                      <strong>Estado:</strong>
                    </span>
                    <span
                      class={
                        state.order.orderIsPaid ? 'verified' : 'no-verified'
                      }
                    >
                      {state.order.orderIsPaid ? 'Facturada' : 'NO Facturada'}
                    </span>
                  </li>
                  <li>
                    <span>
                      <strong>Metodo de pago:</strong>
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
                      <strong>Total pagado:</strong>
                    </span>
                    <span>
                      <UsePrice price={state.order.orderTotalAmout} />
                    </span>
                  </li>
                </ul>
              </div>
            )}
          />

          <div class="container-button-invoince">
            <DownloadButton targetId="invoice" state={state} />
            <PrintButton targetId="invoice" />
          </div>
          <div class="button-view-order">
            {' '}
            <Link href={'/a/user/my/orders/recent/'} reload={true}>
              Ver ordenes
            </Link>
          </div>
          <div>
            <QualifyShoppingExperience
              statepr={state}
              orderInfoResource={orderInfoResource}
            />
          </div>
        </div>
      </div>
    </div>
  );
});
export const head: DocumentHead = {
  title: 'Douvery: Success payment',
  meta: [
    {
      name: 'description',
      content:
        'Transacción aprobada, rápida y segura. Disfrute de la comodidad de comprar en línea con total tranquilidad. ¡Gracias por su compra!',
    },
  ],
};

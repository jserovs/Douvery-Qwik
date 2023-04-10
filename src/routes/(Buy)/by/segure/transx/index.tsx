import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';
import { urlServerNode } from '~/services/fechProduct';

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const err = useStore({ setError: '' });
  const success = useStore({ setSuccess: '' });
  const userACC = useGetCurrentUser().value;
  useVisibleTask$(async () => {
    const token = loc.url.searchParams.get('token');
    const orderId = loc.url.searchParams.get('order');

    if (orderId) {
      // Verificar en la URL "approved" si orderId está presente
      try {
        const response = await fetch(
          `${urlServerNode}/api/check-payment-status/stripe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': `${userACC?.token}`,
            },
            body: JSON.stringify({
              sessionId: orderId, // Enviar sessionId con el valor de orderId
            }),
          }
        );

        const responseData = await response.json();

        if (responseData.captureData.state === 'approved') {
          success.setSuccess = 'Payment completed';
          nav(
            '/by/segure/pay/success?order=' + responseData.order.orderId,
            true
          );
        }
      } catch (error) {
        err.setError = `Error: `;
      }
    }

    if (token) {
      // Realizar acciones específicas si token está presente
      try {
        const response = await fetch(`${urlServerNode}/capture-paypal-order`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            orderID: token,
            paymentId: loc.url.searchParams.get('paymentId'),
            payerId: loc.url.searchParams.get('PayerID'),
          }),
        });

        const responseData = await response.json();

        if (responseData.captureData.state === 'approved') {
          success.setSuccess = 'Payment completed';
          nav(
            '/by/segure/pay/success?order=' + responseData.order.orderId,
            true
          );
        }
      } catch (error) {
        err.setError = `Error: `;
      }
    }

    if (!orderId && !token) {
      console.error('Error: orderId y token no están presentes en la URL');
    }
  });
  useStylesScoped$(`
    .container-all {
      display: grid;
      justify-content: center;
      minheight: 100rem;
 
    }
    .container-loader{
      background-color: var(--color-background-white);
    padding: 2rem;
    margin-top: 10px;
    height: 850px;
    width: 550px;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(35, 85, 161, 0.027) 0px 0px 0px 1px;

    }
  `);
  return (
    <>
      <div class="container-all">
        <div class="container-loader">
          <div class="loader"></div>
          <h1>{err.setError}</h1>
          <h1>{success.setSuccess}</h1>
        </div>
      </div>
    </>
  );
});

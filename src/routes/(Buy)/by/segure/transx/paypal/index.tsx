import {
  component$,
  useStore,
  useStylesScoped$,
  useVisibleTask$,
} from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';
import { removeAllCartItems } from '~/services/cart/cart';
import { urlServerNode } from '~/services/fechProduct';

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const err = useStore({ setError: '' });
  const success = useStore({ setSuccess: '' });
  const userACC = useGetCurrentUser().value;
  useVisibleTask$(async () => {
    const token = loc.url.searchParams.get('token');

    // Realizar acciones específicas si token está presente
    try {
      const response = await fetch(`${urlServerNode}/capture-paypal-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': `${userACC?.token}`,
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
        removeAllCartItems();
        nav('/by/segure/pay/success?order=' + responseData.order.orderId, true);
      }
    } catch (error) {
      err.setError = `Error: `;
    }

    if (!token) {
      err.setError = `Actualmente no posees una orden de compra.`;
      console.error('Error: orderId y token no están presentes en la URL');
    }
  });
  useStylesScoped$(`
  
    h1{
    text-align: center;
    font-size: 30px;
    font-weight: bold;
    margin: 0px 10px;
    }
  `);
  return (
    <>
      <div class="container-all">
        <div class="container-loader">
          <h1>{success.setSuccess}</h1>
          <div class="loader"></div>
          <h1>{err.setError}</h1>
        </div>
      </div>
    </>
  );
});

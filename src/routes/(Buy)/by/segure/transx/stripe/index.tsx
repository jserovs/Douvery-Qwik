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
    const orderId = loc.url.searchParams.get('order');
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

      if (responseData.state === 'approved') {
        success.setSuccess = 'Payment completed';
        removeAllCartItems();
        nav('/by/segure/pay/success?order=' + responseData.orderId, true);
      }
    } catch (error) {
      err.setError = `Error: `;
    }

    if (!orderId) {
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

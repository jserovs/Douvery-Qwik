import { component$, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { useLocation, useNavigate } from '@builder.io/qwik-city';
import { urlServerLocal, urlServerNode } from '~/services/fechProduct';

export default component$(() => {
  const loc = useLocation();
  const nav = useNavigate();
  const err = useStore({ setError: '' });
  const success = useStore({ setSuccess: '' });
  urlServerNode;
  useVisibleTask$(async () => {
    const token = loc.url.searchParams.get('token');
    try {
      const response = await fetch(`${urlServerLocal}/capture-paypal-order`, {
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
      console.log(responseData);
      if (responseData.captureData.state === 'approved') {
        success.setSuccess = 'Payment completed';
        nav('/by/segure/pay/success?order=' + responseData.order.orderId, true);
      }
    } catch (error) {
      err.setError = `Error: `;
    }
  });

  return (
    <>
      <div>
        <h1>{err.setError}</h1>
        <h1>{success.setSuccess}</h1>
      </div>
    </>
  );
});

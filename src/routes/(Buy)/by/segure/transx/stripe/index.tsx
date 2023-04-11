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
    .container-all {
      display: grid;
      justify-content: center;
      minheight: 100rem;
      text-align: center;
 
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

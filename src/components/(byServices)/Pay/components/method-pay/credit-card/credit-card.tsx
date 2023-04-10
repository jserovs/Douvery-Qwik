import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';

import { DouveryCard } from '~/components/icons/card';
import { useGetCurrentUser } from '~/routes/layout';
import { urlServerNode } from '~/services/fechProduct';
import styles from './credit-card.css?inline';
export const ButtonCreditCard = component$(
  ({
    car_product,
    totalAmount,
    shipping,
    taxAmount,

    address,
  }: any) => {
    useStylesScoped$(styles);
    const loader = useStore({ setLoader: false });
    const userACC = useGetCurrentUser().value;
    const createOrder = $(async () => {
      try {
        loader.setLoader = true;
        const cartItems = car_product.productResults.map((product: any) => {
          return {
            name: product.name,
            dui: product.dui,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
          };
        });

        const response = await fetch(
          `${urlServerNode}/api/create-checkout-session-stripe`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'x-auth-token': `${userACC?.token}`,
            },
            body: JSON.stringify({
              userId: userACC?.id,
              cart: [...cartItems],
              totalAmout: totalAmount,
              totalTaxt: taxAmount,
              shipping: shipping,
              shippingAddress: address,
              paymentMethod: 'stripe - card',
              successUrl: `https://douvery-qwik.vercel.app/by/segure/transx`,
              cancelUrl: 'https://www.example.com/cancel',
            }),
          }
        );

        const orderData = await response.json();

        if (orderData.sessionUrl) {
          window.location.href = orderData.sessionUrl;
        }
        return orderData.id;
      } catch (error) {
        console.error('Error al crear la orden:', error);
      }
    });

    const handleClickPaypal = $(async () => {
      try {
        await createOrder();
      } catch (error) {
        console.error('Error en el proceso de pago:', error);
      }
    });
    return (
      <>
        <button class="button-credit-card" onClick$={handleClickPaypal}>
          {loader.setLoader ? (
            <>
              <div class="loader"></div>
            </>
          ) : (
            <>
              {' '}
              <DouveryCard /> Pagar con Tarjeta
            </>
          )}{' '}
        </button>
      </>
    );
  }
);

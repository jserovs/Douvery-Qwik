import { $, component$, useStore, useStylesScoped$ } from '@builder.io/qwik';
import styles from './paypal-method.css?inline';
import { useLocation } from '@builder.io/qwik-city';
import { useGetCurrentUser } from '~/routes/layout';
import { urlServerNode } from '~/services/fechProduct';
import { NamePaypalIcon } from '~/components/icons/paypal';
export const PaypalMethod = component$(
  ({ car_product, totalAmount, shipping, taxAmount, address }: any) => {
    useStylesScoped$(styles);
    const loader = useStore({ setLoader: false });
    const userACC = useGetCurrentUser().value;
    const loc = useLocation();
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

        const response = await fetch(`${urlServerNode}/create-paypal-order`, {
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
            paymentMethod: 'paypal',
            successUrl: loc.url.origin + `/by/segure/transx/paypal`,
            cancelUrl: loc.url.origin + `/by/segure/address/`,
          }),
        });

        const orderData = await response.json();

        const approveLink = orderData.links.find(
          (link: any) => link.rel === 'approval_url'
        );

        if (approveLink) {
          window.location.href = approveLink.href;
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
        <button class="button-paypal" onClick$={handleClickPaypal}>
          {loader.setLoader ? (
            <>
              <div class="loader"></div>
            </>
          ) : (
            <NamePaypalIcon />
          )}{' '}
        </button>
      </>
    );
  }
);
